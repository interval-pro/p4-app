import {
  Component,
  ElementRef,
  HostListener,
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

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ButtonComponent, ContextMenuComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  result = {} as Result;
  private resultSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target) this.renderer.setStyle(target, 'outline', '2px solid white');
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target) this.renderer.removeStyle(target, 'outline');
  }

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

  ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }
}
