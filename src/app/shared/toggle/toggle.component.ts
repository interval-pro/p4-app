import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  isChecked: boolean = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  onToggle() {
    this.isChecked = !this.isChecked;
    this.toggle.emit(this.isChecked);
  }
}
