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
import { Result, Section } from '../../models/result.model';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
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

  ngOnInit(): void {
    this.resultSubscription = this.subscribeToResult();
  }

  subscribeToResult(): Subscription {
    return this.api.getMockedData().subscribe({
      next: (res) => {
        this.result = res;
        this.result.sections = this.sanitizeSections(this.result.sections);
        this.applyStyles(this.result.styles);
      },
      error: console.log,
      complete: console.log,
    });
  }

  regenerateSection(section: Section) {
    // api call to be implemented
    console.log(section);
  }

  sanitizeSections(sections: Section[]) {
    return sections.map((section: Section) => ({
      ...section,
      safeContent: this.sanitizer.bypassSecurityTrustHtml(section.HTML),
    }));
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
