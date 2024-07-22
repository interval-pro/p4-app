import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { actionsMaps } from '../../constants/actions.maps';
import { ApiActions } from '../../constants/api.enums';
import { ApiService } from '../../services/api.service';
import { LoaderComponent } from '../loader/loader.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [LoaderComponent, ConfirmDialogComponent],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent implements OnChanges {
  @ViewChild('fileInput') fileInput = {} as ElementRef;

  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() isLoadingChanges: boolean = false;
  @Input() event = {} as MouseEvent;

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  target = {} as HTMLElement;
  position = { x: 0, y: 0 };
  isNearBottom: boolean = false;
  isNearRight: boolean = false;
  showConfirmDialog: boolean = false;
  isConfirmedDelete: boolean = false;
  availableActions: string[] = [];

  constructor(
    private renderer: Renderer2,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    for (const inputName in changes) {
      if (inputName !== 'isOpen') return;

      const isOpenValue = changes[inputName].currentValue;
      if (isOpenValue) return this.open();

      this.close();
    }
  }

  open() {
    this.target = this.event.target as HTMLElement;
    this.renderer.setStyle(this.target, 'filter', 'blur(3px)');
    this.availableActions = this.displayActions(this.target.nodeName);

    this.isNearBottom =
      window.innerHeight - this.event.clientY < window.innerHeight / 5;
    this.isNearRight =
      window.innerWidth - this.event.clientX < window.innerWidth / 5;

    this.position.x = this.event.clientX + window.scrollX;
    this.position.y = this.event.clientY + window.scrollY;
  }

  close() {
    this.renderer.removeStyle(this.target, 'filter');
    this.renderer.removeStyle(this.target, 'outline');
    this.closeMenu.emit(true);
  }

  calculatePosition() {
    const cursorWidthOffset = 16;

    if (this.isNearBottom && this.isNearRight) {
      return {
        bottom: window.innerHeight - this.position.y + 'px',
        right: window.innerWidth - this.position.x - cursorWidthOffset + 'px',
        'border-radius': '0.5em 0.5em 0 0.5em',
      };
    }

    if (this.isNearBottom) {
      return {
        bottom: window.innerHeight - this.position.y + 'px',
        left: this.position.x + 'px',
        'border-radius': '0.5em 0.5em 0.5em 0',
      };
    }

    if (this.isNearRight) {
      return {
        top: this.position.y + 'px',
        right: window.innerWidth - this.position.x - cursorWidthOffset + 'px',
        'border-radius': '0.5em 0 0.5em 0.5em',
      };
    }

    return {
      top: this.position.y + 'px',
      left: this.position.x + 'px',
      'border-radius': '0 0.5em 0.5em 0.5em',
    };
  }

  displayActions(nodeName: string) {
    for (const map of actionsMaps) {
      if (map.targets.includes(nodeName)) return map.actions;
    }

    return ['Delete'];
  }

  returnActionIcon(action: string): string {
    return (
      `/assets/icons/${action.toLowerCase()}.svg` ||
      '/assets/icons/placeholder.svg'
    );
  }

  onAction(action: string) {
    switch (action) {
      case ApiActions.REGENERATE:
        this.onRegenerate();
        break;
      case ApiActions.EDIT:
        this.onEdit();
        break;
      case ApiActions.DELETE:
        this.onDeleteRequest();
        break;
      case ApiActions.UPLOAD:
        this.onUpload();
        break;
    }
  }

  onRegenerate() {
    this.close();

    const section = this.target.closest('section, header, footer');
    const styleElement = section?.nextElementSibling;
    const sectionStyle = styleElement?.outerHTML;
    const elementHTML = this.target.outerHTML;

    if (!section || !styleElement || !sectionStyle) {
      this.toastr.error('Error: Invalid selection');
      return;
    }

    this.isLoadingChanges = true;

    this.api
      .mockRegenerateElement({ HTML: elementHTML, CSS: sectionStyle })
      .subscribe({
        next: (res) => {
          this.target.outerHTML = res.HTML;
          styleElement.innerHTML = res.CSS;
        },
      });

    setTimeout(() => (this.isLoadingChanges = false), 1000);
  }

  onDeleteRequest() {
    this.close();

    this.showConfirmDialog = true;
  }

  onConfirmedDelete(isConfirmed: boolean) {
    this.showConfirmDialog = false;

    if (isConfirmed)
      this.renderer.removeChild(this.target.parentNode, this.target);
  }

  onEdit() {
    this.close();

    this.target.contentEditable = this.target.isContentEditable
      ? 'false'
      : 'true';
  }

  onUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length <= 0) {
      this.toastr.error('Error: No file selected');
      return;
    }
    const file = input.files[0];

    this.close();
    this.isLoadingChanges = true;

    const imageToReplace = this.target as HTMLImageElement;

    this.api.mockUploadImage(file).subscribe({
      next: (res) => (imageToReplace.src = res.fileUrl),
    });

    setTimeout(() => (this.isLoadingChanges = false), 1000);
  }
}
