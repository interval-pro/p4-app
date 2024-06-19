import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData } from '../../../models/company-data.model';

@Component({
  selector: 'app-details-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.scss',
})
export class DetailsFormComponent implements OnInit {
  detailsForm = {} as FormGroup;
  companyData = {} as CompanyData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyData = this.fs.getCompanyData();

    this.detailsForm = this.fb.nonNullable.group({
      headline: this.companyData.headlineSuggestions,
      subheadline: this.companyData.subheadlineSuggestions,
      keyMessage: this.companyData.keyMessages,
      callToAction: this.companyData.callToAction,
      additionalContent: this.companyData.additionalContent,
    });
  }

  onCancel(): void {
    this.fs.resetCompanyData();
    this.router.navigateByUrl('/form/step-2');
  }

  onSubmit(): void {
    this.fs.updateCompanyData(this.detailsForm.value);
    this.router.navigateByUrl('/result');
  }
}
