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
import {
  FinishedSection,
  GeneratedSection,
  Layout,
} from '../../models/api.interfaces';
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
  loadedSections: number = 0;

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
        this.createAndAppendStyle(this.elRef, layout.mainStyle);
        this.callAllSectionSubscriptions();
      },
      error: console.log,
      complete: console.log,
    });
  }

  callAllSectionSubscriptions() {
    for (const section of this.sections) {
      const timeout: number = 1000 + Math.random() * (7000 - 1000);

      setTimeout(
        () => this.sectionSubscriptions.push(this.subscribeToSection(section)),
        timeout
      );
    }
  }

  subscribeToSection(targetSection: Partial<FinishedSection>): Subscription {
    if (!targetSection.sectionId) return new Subscription();

    return this.api.getSection(targetSection.sectionId).subscribe({
      next: (sectionContent) => {
        this.sectionElements.forEach((el) =>
          this.findAndApplySectionMarkup(sectionContent, targetSection)
        );

        this.loadedSections++;
        if (this.loadedSections == this.sections.length)
          this.isLoadingSections = false;
      },
      error: console.log,
      complete: console.log,
    });
  }

  findAndApplySectionMarkup(
    sectionContentFromApi: GeneratedSection,
    targetSection: Partial<FinishedSection>
  ) {
    this.sectionElements.forEach((elementRef) => {
      if (elementRef.nativeElement.id == sectionContentFromApi.sectionId) {
        elementRef.nativeElement.innerHTML = sectionContentFromApi.HTML;
        this.createAndAppendStyle(elementRef, sectionContentFromApi.CSS);

        targetSection.HTML = sectionContentFromApi.HTML;
        targetSection.CSS = sectionContentFromApi.CSS;
        targetSection.isLoading = false;
      }
    });
  }

  createAndAppendStyle(elRef: ElementRef, style: string) {
    style = style.replace('body', '#site');

    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = style;
    this.renderer.appendChild(elRef.nativeElement, styleElement);
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
