import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-section',
  standalone: true,
  imports: [],
  templateUrl: './section-error.component.html',
  styleUrl: './section-error.component.scss',
})
export class ErrorSectionComponent {
  @Input() size: string = '2.8rem';
}
