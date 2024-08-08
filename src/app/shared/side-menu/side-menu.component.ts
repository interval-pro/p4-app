import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { LoaderComponent } from '../loader/loader.component';
import { ExportService } from '../../services/export.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ToggleComponent, LoaderComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @ViewChild('sideMenuWrapper') sideMenuWrapper!: ElementRef;

  isOpen: boolean = false;
  private isDragging = false;
  private startY!: number;
  private startTop!: number;

  @Input() isAllSectionsLoaded: boolean = true;
  @Input() siteRef = {} as HTMLElement;
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  constructor(
    private exportService: ExportService,
    private toastr: ToastrService
  ) {}

  toggleEditMode(isToggled: boolean) {
    this.toggleEdit.emit(isToggled);
  }

  toggleMenu() {
    if (this.isAllSectionsLoaded) this.isOpen = !this.isOpen;
  }

  exportHtml() {
    this.toastr.success('Download started');
    const htmlContent = this.exportService.exportAsHtml(this.siteRef);
    this.exportService.downloadFile(htmlContent, 'page.html', 'text/html');
  }

  exportPdf() {
    this.toastr.success('Download started');
    this.exportService.exportAsPdf(this.siteRef);
  }

  exportJson() {
    this.toastr.success('Download started');
    const jsonData = { content: this.siteRef.outerHTML };
    const jsonContent = this.exportService.exportAsJson(jsonData);
    this.exportService.downloadFile(
      jsonContent,
      'page.json',
      'application/json'
    );
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.startY = event.clientY;
    const rect = this.sideMenuWrapper.nativeElement.getBoundingClientRect();
    this.startTop = rect.top;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const newTop = this.startTop + (event.clientY - this.startY);

      if (newTop < 32 || newTop > window.innerHeight - 256) return;

      this.sideMenuWrapper.nativeElement.style.top = `${newTop}px`;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }
}
