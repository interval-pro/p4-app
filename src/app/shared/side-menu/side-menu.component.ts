import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  toggleEditMode(isToggled: boolean) {
    this.toggleEdit.emit(isToggled);
  }
}
