import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import { actionMappings } from '../action-mappings';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
})
export class ContextMenuComponent {
  @Output() visibilityChange = new EventEmitter<boolean>();

  target = {} as HTMLElement;
  position = { x: 0, y: 0 };
  isVisible: boolean = false;
  isNearBottom: boolean = false;
  isNearRight: boolean = false;
  availableActions: string[] = [];

  constructor(private renderer: Renderer2) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isVisible) this.close(event);
  }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentRightClick(event: MouseEvent) {
    if (this.isVisible) return this.close(event);
    this.open(event);
  }

  open(event: MouseEvent) {
    event.preventDefault();

    this.target = event.target as HTMLElement;
    this.renderer.setStyle(this.target, 'filter', 'blur(3px)');
    this.availableActions = this.displayActions(this.target);

    this.isNearBottom =
      window.innerHeight - event.clientY < window.innerHeight / 5;
    this.isNearRight =
      window.innerWidth - event.clientX < window.innerWidth / 5;

    this.position.x = event.clientX + window.scrollX;
    this.position.y = event.clientY + window.scrollY;

    this.isVisible = true;
    this.visibilityChange.emit(this.isVisible);
  }

  close(event: MouseEvent) {
    event.preventDefault();

    this.renderer.removeStyle(this.target, 'filter');
    this.renderer.removeStyle(this.target, 'outline');
    this.target = {} as HTMLElement;

    this.isVisible = false;
    this.visibilityChange.emit(this.isVisible);
  }

  calculatePosition() {
    const cursorWidthOffset = 16;

    if (this.isNearBottom && this.isNearRight) {
      return {
        bottom: window.innerHeight - this.position.y + 'px',
        right: window.innerWidth - this.position.x - cursorWidthOffset + 'px',
        'border-radius': '0.5em 0.5em 0 0.5em',
      };
    }

    if (this.isNearBottom) {
      return {
        bottom: window.innerHeight - this.position.y + 'px',
        left: this.position.x + 'px',
        'border-radius': '0.5em 0.5em 0.5em 0',
      };
    }

    if (this.isNearRight) {
      return {
        top: this.position.y + 'px',
        right: window.innerWidth - this.position.x - cursorWidthOffset + 'px',
        'border-radius': '0.5em 0 0.5em 0.5em',
      };
    }

    return {
      top: this.position.y + 'px',
      left: this.position.x + 'px',
      'border-radius': '0 0.5em 0.5em 0.5em',
    };
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

  returnActionIcon(action: string): string {
    if (action.includes('Regenerate')) return '/assets/icons/regenerate.svg';
    if (action.includes('Edit')) return '/assets/icons/edit.svg';
    if (action.includes('Upload')) return '/assets/icons/upload.svg';
    if (action.includes('Delete')) return '/assets/icons/delete.svg';
    return '/assets/icons/placeholder.svg';
  }

  onAction(action: string) {
    this.renderer.removeStyle(this.target, 'filter');

    console.log(action, this.target);
  }
}
