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
import { ResultMenuComponent } from '../../shared/result-menu/result-menu.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ButtonComponent, ContextMenuComponent, ResultMenuComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  result = {} as Result;
  isContextMenuVisible: boolean = false;
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

  handleVisibilityChange(isVisible: boolean) {
    this.isContextMenuVisible = isVisible;
  }

  applyStyles(styles: string) {
    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = styles;
    this.renderer.appendChild(this.elRef.nativeElement, styleElement);
  }

  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && !this.isContextMenuVisible)
      this.renderer.setStyle(target, 'outline', '2px dashed white');
  }

  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && !this.isContextMenuVisible)
      this.renderer.removeStyle(target, 'outline');
  }

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }
}
