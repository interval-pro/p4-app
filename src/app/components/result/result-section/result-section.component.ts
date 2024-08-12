import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  FinishedSection,
  GeneratedHTMLElement,
} from '../../../models/api.interfaces';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { ApiService } from '../../../services/api.service';
import { StylesService } from '../../../services/styles.service';
import { ErrorSectionComponent } from '../../../shared/error-section/section-error.component';
import { RegenerateService } from '../../../services/regenerate';

@Component({
  selector: 'app-result-section',
  standalone: true,
  imports: [LoaderComponent, ErrorSectionComponent],
  templateUrl: './result-section.component.html',
  styleUrl: './result-section.component.scss',
})
export class ResultSectionComponent implements OnInit, OnDestroy {
  @ViewChild('innerWarpper') innerWarpper = {} as ElementRef;

  @Input() section: Partial<FinishedSection> = {};
  @Output() sectionCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  private sectionSubscription: Subscription = new Subscription();
  private sectionRegenrateSubs: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private styles: StylesService,
    private elRef: ElementRef,
    private regenrateService: RegenerateService
  ) {}

  ngOnInit(): void {
    this.sectionSubscription = this.subscribeToSection();
    this.subsToRegenerate();
  }

  subsToRegenerate() {
    this.sectionRegenrateSubs =
      this.regenrateService.regenerateAction$.subscribe((data) => {
        if (!data) return;
        if (data.sectionId !== this.section.sectionId) return;
        this.cleanSection();
        this.section.isError = false;
        this.section.isLoading = true;
        this.sectionCompleted.emit(false);
        this.sectionSubscription.unsubscribe();
  
        this.sectionSubscription = this.api.getSection(data)
        .subscribe({
          next: (sectionContent) => {
            this.applySectionMarkup(sectionContent, this.section);
            this.sectionCompleted.emit(true);
          },
          error: (error) => {
            this.section.isError = true;
            this.section.isLoading = false;
            this.sectionCompleted.emit(true);
          },
        });
      });
  }
  subscribeToSection(): Subscription {
    return this.api.getSection(this.section).subscribe({
      next: (sectionContent) => {
        this.applySectionMarkup(sectionContent, this.section);
        this.sectionCompleted.emit(true);
      },
      error: (error) => {
        this.section.isError = true;
        this.section.isLoading = false;
        this.sectionCompleted.emit(true);
      },
    });
  }

  cleanSection() {
    // this.elRef.nativeElement.innerHTML = '';
    this.styles.removeStyle(this.elRef);
    this.section.HTML = '';
    this.section.CSS = '';
  }

  applySectionMarkup(
    sectionContentFromApi: GeneratedHTMLElement,
    targetSection: Partial<FinishedSection>
  ) {
    this.innerWarpper.nativeElement.innerHTML = sectionContentFromApi.HTML;
    this.styles.createAndAppendStyle(this.innerWarpper, sectionContentFromApi.CSS);

    targetSection.HTML = sectionContentFromApi.HTML;
    targetSection.CSS = sectionContentFromApi.CSS;
    this.section.isLoading = false;
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
    this.sectionRegenrateSubs.unsubscribe();
  }
}
