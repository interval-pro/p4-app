import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Layout } from '../../models/api.interfaces';
import { ButtonComponent } from '../../shared/button/button.component';
import { ContextMenuComponent } from '../../shared/context-menu/context-menu.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ResultSectionComponent } from '../result-section/result-section.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    ButtonComponent,
    ContextMenuComponent,
    SideMenuComponent,
    LoaderComponent,
    ResultSectionComponent,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  layout = {} as Layout;
  event = {} as MouseEvent;
  loadedSections: number = 0;

  isEditMode: boolean = false;
  isContextMenuOpen: boolean = false;
  isLoadingSections: boolean = true;

  private layoutSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.layoutSubscription = this.subscribeToLayout();
  }

  subscribeToLayout(): Subscription {
    return this.api.getMockedLayout().subscribe({
      next: (layout) => {
        this.layout = layout;
        layout.sections.forEach((s) => (s.isLoading = true));
        this.createAndAppendStyle(this.elRef, layout.mainStyle);
      },
      error: console.log,
      complete: console.log,
    });
  }

  createAndAppendStyle(elRef: ElementRef, style: string) {
    style = style.replace('body', '#site');

    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = style;
    this.renderer.appendChild(elRef.nativeElement, styleElement);
  }

  onLoadedSection(isLoaded: boolean) {
    if (isLoaded) this.loadedSections++;
    if (this.loadedSections == this.layout.sections.length)
      this.isLoadingSections = false;
  }

  onToggleEditMode(isToggled: boolean) {
    this.isEditMode = isToggled;
  }

  onCloseContextMenu(shouldClose: boolean) {
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
    this.layoutSubscription.unsubscribe();
  }
}
