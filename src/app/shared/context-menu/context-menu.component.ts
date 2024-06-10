import { Component, HostListener, Renderer2 } from '@angular/core';
import { actionMappings } from '../action-mappings';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent {
  visible = false;
  position = { x: 0, y: 0 };
  target = {} as HTMLElement;
  availableActions: string[] = [];
  isNearBottom: boolean = false;
  viewportHeight = window.innerHeight;

  constructor(private renderer: Renderer2) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.visible) this.close(event);
  }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentRightClick(event: MouseEvent) {
    if (!this.visible) return this.open(event);
    this.close(event);
  }

  open(event: MouseEvent) {
  }
  close(event: MouseEvent) {
  }
}
