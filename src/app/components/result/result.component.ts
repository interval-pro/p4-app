import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Layout } from '../../models/api.interfaces';
import { ButtonComponent } from '../../shared/button/button.component';
import { ContextMenuComponent } from '../../shared/context-menu/context-menu.component';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ResultSectionComponent } from './result-section/result-section.component';
import { ApiService } from '../../services/api.service';
import { StylesService } from '../../services/styles.service';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    ButtonComponent,
    ContextMenuComponent,
    SideMenuComponent,
    LoaderComponent,
    ResultSectionComponent,
    CommonModule,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  layout = {} as Layout;
  event = {} as MouseEvent;

  isEditMode: boolean = false;
  isContextMenuOpen: boolean = false;
  isLoadingLayout: boolean = true;
  isSideMenuVisible: boolean = false;
  completedSections: number = 0;

  private layoutSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private styles: StylesService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    private fs: FormService,
  ) {}

  get isAllSectionsLoaded(): boolean {
    return this.layout.sections.length === this.completedSections;
  }

  ngOnInit(): void {
    if (!this.fs.isTotalCompleted) {
      this.router.navigateByUrl('/');
      return;
    };
    this.layoutSubscription = this.subscribeToLayout();
  }

  onSectionCompleted(isCompleted: boolean) {
    if (!isCompleted) this.completedSections--;
    if (isCompleted) this.completedSections++;
  }
  
  subscribeToLayout(): Subscription {
    return this.api.getLayout().subscribe({
      next: (layout) => {
        this.layout = layout;
        this.layout.sections.forEach((s) => (s.isLoading = true));
        this.styles.createAndAppendStyle(this.elRef, this.layout.mainStyle);
        this.isLoadingLayout = false;
        this.isSideMenuVisible = true;
      },
      error: (e) => {
        this.isLoadingLayout = false;
        this.router.navigateByUrl('/preview');
      },
    });
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
    if (this.isContextMenuOpen) this.isContextMenuOpen = false;
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
