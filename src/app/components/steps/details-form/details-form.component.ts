import { Component } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { DetailsData } from '../../../models/company-data.model';

@Component({
  selector: 'app-details-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './details-form.component.html',
  styleUrl: '../forms.scss',
})
export class DetailsFormComponent{
  detailsForm = this.fb.group({
    headlineSuggestions: [this.fs.detailsData.headlineSuggestions, Validators.required],
    subheadlineSuggestions: [this.fs.detailsData.subheadlineSuggestions, Validators.required],
    keyMessages : [this.fs.detailsData.keyMessages, Validators.required],
    callToAction: [this.fs.detailsData.callToAction, Validators.required],
    additionalContent: [this.fs.detailsData.additionalContent, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {};

  get detailsData(): DetailsData {
    return this.fs.detailsData;
  }

  set detailsData(data: Partial<DetailsData>) {
    this.fs.detailsData = data;
  }

  get isButtonDisabled(): boolean {
    return this.detailsForm.invalid;
  }

  onBack(): void {
    this.detailsData = this.detailsForm.value as Partial<DetailsData>;
    this.router.navigateByUrl('/form/step-2');
  }

  onSubmit(): void {
    this.detailsData = this.detailsForm.value as Partial<DetailsData>;
    this.router.navigateByUrl('/preview');
  }
}
