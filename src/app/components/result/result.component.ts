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
import { FinishedSection, Layout } from '../../models/api.interfaces';
import { ButtonComponent } from '../../shared/button/button.component';
import { ContextMenuComponent } from '../../shared/context-menu/context-menu.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    ButtonComponent,
    ContextMenuComponent,
    SideMenuComponent,
    LoaderComponent,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  layout = {} as Layout;
  event = {} as MouseEvent;
  sections: Partial<FinishedSection>[] = [];

  isEditMode: boolean = false;
  isContextMenuOpen: boolean = false;
  isLoadingSections: boolean = true;

  private layoutSubscription: Subscription = new Subscription();
  private sectionSubscriptions: Subscription[] = new Array();

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
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
        this.sections = layout.sections;
        setTimeout(() => this.callAllSectionSubscriptions(), 5000);
      },
      error: console.log,
      complete: console.log,
    });
  }

  callAllSectionSubscriptions() {
    for (const section of this.layout.sections) {
      this.sectionSubscriptions.push(this.subscribeToSection());
    }
  }

  subscribeToSection(): Subscription {
    return this.api.getSection().subscribe({
      next: (section) => {
        console.log(section);
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

    for (const subsription of this.sectionSubscriptions) {
      subsription.unsubscribe();
    }
  }
}
