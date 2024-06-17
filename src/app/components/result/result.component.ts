import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';

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
  @ViewChildren('section') sectionElements = {} as QueryList<ElementRef>;

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
        this.sections = layout.sections;
        this.callAllSectionSubscriptions();
      },
      error: console.log,
      complete: console.log,
    });
  }

  callAllSectionSubscriptions() {
    for (const section of this.sections) {
      const timeout: number = 1000 + Math.random() * (10000 - 1000);

      setTimeout(
        () => this.sectionSubscriptions.push(this.subscribeToSection(section)),
        timeout
      );
    }
    // this.isLoadingSections = false;
  }

  subscribeToSection(currentSection: Partial<FinishedSection>): Subscription {
    if (!currentSection.sectionId) return new Subscription();

    return this.api.getSection(currentSection.sectionId).subscribe({
      next: (sectionContent) => {
        this.sectionElements.forEach((el) => {
          if (el.nativeElement.id == sectionContent.sectionId) {
            el.nativeElement.innerHTML = sectionContent.HTML;

            const styleEl = this.renderer.createElement('style');
            styleEl.innerHTML = sectionContent.CSS;
            this.renderer.appendChild(el.nativeElement, styleEl);

            currentSection.HTML = sectionContent.HTML;
            currentSection.CSS = sectionContent.CSS;
            currentSection.isLoading = false;
          }
        });
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
