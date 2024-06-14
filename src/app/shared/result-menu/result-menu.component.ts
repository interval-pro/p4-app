import { Component, EventEmitter, Output } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-result-menu',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './result-menu.component.html',
  styleUrl: './result-menu.component.scss',
})
export class ResultMenuComponent {
  @Output() toggleEdit: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  toggleEditMode(isToggled: boolean) {
    this.toggleEdit.emit(isToggled);
  }
  toggleMenu() {}
}
