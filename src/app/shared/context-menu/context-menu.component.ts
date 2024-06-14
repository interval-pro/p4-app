import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { actionMappings } from '../action-mappings';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent implements OnChanges {
  @Input() isEditMode: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() event = {} as MouseEvent;

  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  target = {} as HTMLElement;
  position = { x: 0, y: 0 };
  isNearBottom: boolean = false;
  isNearRight: boolean = false;
  availableActions: string[] = [];

  constructor(private renderer: Renderer2) {}

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
    this.availableActions = this.displayActions(this.target);

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

  displayActions(target: HTMLElement) {
    const nodeName = target.nodeName;

    for (const key in actionMappings) {
      if (actionMappings[key].targets.includes(nodeName)) {
        return actionMappings[key].actions;
      }
    }

    return ['Delete'];
  }

  returnActionIcon(action: string): string {
    if (action.includes('Regenerate')) return '/assets/icons/regenerate.svg';
    if (action.includes('Edit')) return '/assets/icons/edit.svg';
    if (action.includes('Upload')) return '/assets/icons/upload.svg';
    if (action.includes('Delete')) return '/assets/icons/delete.svg';
    return '/assets/icons/placeholder.svg';
  }

  onAction(action: string) {
    this.close();

    console.log(action, this.target);
  }
}
