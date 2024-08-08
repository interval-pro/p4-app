import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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

@Component({
  selector: 'app-result-section',
  standalone: true,
  imports: [LoaderComponent, ErrorSectionComponent],
  templateUrl: './result-section.component.html',
  styleUrl: './result-section.component.scss',
})
export class ResultSectionComponent implements OnInit, OnDestroy {
  @Input() section: Partial<FinishedSection> = {};
  @Output() sectionCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  private sectionSubscription: Subscription = new Subscription();

  constructor(
    private api: ApiService,
    private styles: StylesService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.sectionSubscription = this.subscribeToSection();
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

  applySectionMarkup(
    sectionContentFromApi: GeneratedHTMLElement,
    targetSection: Partial<FinishedSection>
  ) {
    this.elRef.nativeElement.innerHTML = sectionContentFromApi.HTML;
    this.styles.createAndAppendStyle(this.elRef, sectionContentFromApi.CSS);

    targetSection.HTML = sectionContentFromApi.HTML;
    targetSection.CSS = sectionContentFromApi.CSS;
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }
}
