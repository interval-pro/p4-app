import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { FinishedSection, GeneratedSection } from '../../models/api.interfaces';

@Component({
  selector: 'app-result-section',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './result-section.component.html',
  styleUrl: './result-section.component.scss',
})
export class ResultSectionComponent implements OnInit, OnDestroy {
  @Input() section = {} as FinishedSection;
  @Output() loadedSection: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  private sectionSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    setTimeout(
      () => (this.sectionSubscription = this.subscribeToSection()),
      1000 + Math.random() * (7000 - 1000)
    );
  }

  subscribeToSection(): Subscription {
    return this.api.getSection(this.section.sectionId).subscribe({
      next: (sectionContent) => {
        this.applySectionMarkup(sectionContent, this.section);
        this.loadedSection.emit(true);
      },
      error: console.log,
      complete: console.log,
    });
  }

  applySectionMarkup(
    sectionContentFromApi: GeneratedSection,
    targetSection: Partial<FinishedSection>
  ) {
    this.elRef.nativeElement.innerHTML = sectionContentFromApi.HTML;
    this.createAndAppendStyle(this.elRef, sectionContentFromApi.CSS);

    targetSection.HTML = sectionContentFromApi.HTML;
    targetSection.CSS = sectionContentFromApi.CSS;
    targetSection.isLoading = false;
    console.log(this.section);
  }

  createAndAppendStyle(elRef: ElementRef, style: string) {
    const styleElement = this.renderer.createElement('style');
    styleElement.innerHTML = style;
    this.renderer.appendChild(elRef.nativeElement, styleElement);
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }
}
