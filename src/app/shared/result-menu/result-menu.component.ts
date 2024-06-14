import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-result-menu',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './result-menu.component.html',
  styleUrl: './result-menu.component.scss',
})
export class ResultMenuComponent {
  constructor() {}

  toggleMenu() {}
}
