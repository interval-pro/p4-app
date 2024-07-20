import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { LoaderComponent } from '../loader/loader.component';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ToggleComponent, LoaderComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  isOpen: boolean = false;

  @Input() isLoadingResultSections: boolean = true;
  @Input() siteRef = {} as HTMLElement;
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  constructor(private exportService: ExportService) {}

  toggleEditMode(isToggled: boolean) {
    this.toggleEdit.emit(isToggled);
  }

  toggleMenu() {
    if (!this.isLoadingResultSections) this.isOpen = !this.isOpen;
  }

  exportHtml() {
    const htmlContent = this.exportService.exportAsHtml(this.siteRef);
    this.exportService.downloadFile(htmlContent, 'page.html', 'text/html');
  }

  exportPdf() {
    this.exportService.exportAsPdf(this.siteRef);
  }

  exportJson() {
    const jsonData = { content: this.siteRef.innerHTML };
    const jsonContent = this.exportService.exportAsJson(jsonData);
    this.exportService.downloadFile(
      jsonContent,
      'page.json',
      'application/json'
    );
  }
}
