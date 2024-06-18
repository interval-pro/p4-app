import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { LoaderComponent } from '../loader/loader.component';

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
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  toggleEditMode(isToggled: boolean) {
    this.toggleEdit.emit(isToggled);
  }

  toggleMenu() {
    if (!this.isLoadingResultSections) this.isOpen = !this.isOpen;
  }
}
