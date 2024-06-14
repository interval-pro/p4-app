import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  isChecked: boolean = false;

  onToggle() {
    this.isChecked = !this.isChecked;
  }
}
