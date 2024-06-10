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
    if (!event) return;
    event.preventDefault();

    this.target = event.target as HTMLElement;
    this.availableActions = this.displayActions(this.target);

    this.isNearBottom =
      this.viewportHeight - event.clientY < this.viewportHeight / 5;

    this.position.x = event.clientX + window.scrollX;
    this.position.y = event.clientY + window.scrollY;
    this.renderer.setStyle(this.target, 'outline', '2px solid white');
    this.renderer.setStyle(this.target, 'filter', 'brightness(2)');
    this.visible = true;
  }

  close(event: MouseEvent) {
    if (!event) return;

    event.preventDefault();

    this.renderer.removeStyle(this.target, 'outline');
    this.renderer.removeStyle(this.target, 'filter');
    this.target = {} as HTMLElement;
    this.visible = false;
  }

  displayActions(target: HTMLElement) {
    const nodeName = target.nodeName;

    for (const key in actionMappings) {
      if (actionMappings[key].targets.includes(nodeName)) {
        return actionMappings[key].actions;
      }
    }

    return ['Delete'];
  }

  onAction(action: string) {
    console.log(action, this.target);
  }
}
