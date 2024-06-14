import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { ButtonComponent } from '../../shared/button/button.component';
import { ContextMenuComponent } from '../../shared/context-menu/context-menu.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ButtonComponent, ContextMenuComponent, SideMenuComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  result = {} as Result;
  event = {} as MouseEvent;

  isEditMode: boolean = false;
  isContextMenuOpen: boolean = false;

  private resultSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.resultSubscription = this.subscribeToResult();
  }

  subscribeToResult(): Subscription {
    return this.api.getMockedData().subscribe({
      next: (res) => {
        this.result = res;
        this.result.safeContent = this.sanitizer.bypassSecurityTrustHtml(
          this.result.body
        );
        this.applyStyles(this.result.styles);
      },
      error: console.log,
      complete: console.log,
    });
  }

  applyStyles(styles: string) {
    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = styles;
    this.renderer.appendChild(this.elRef.nativeElement, styleElement);
  }

  toggleEditMode(isToggled: boolean) {
    this.isEditMode = isToggled;
  }

  closeContextMenu(shouldClose: boolean) {
    if (shouldClose && this.isContextMenuOpen) this.isContextMenuOpen = false;
  }

  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && this.isEditMode && !this.isContextMenuOpen)
      this.renderer.setStyle(target, 'outline', '2px dashed white');
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && this.isEditMode && !this.isContextMenuOpen)
      this.renderer.removeStyle(target, 'outline');
  }

  onRightClick(event: MouseEvent) {
    if (this.isEditMode) event.preventDefault();

    if (this.isContextMenuOpen) return;

    if (this.isEditMode && event.target) {
      this.isContextMenuOpen = true;
      this.event = event;
    }
  }

  onClick(event: MouseEvent) {
    if (this.isContextMenuOpen) this.isContextMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }
}
