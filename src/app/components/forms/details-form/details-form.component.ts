import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData, DetailsData } from '../../../models/company-data.model';

@Component({
  selector: 'app-details-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.scss',
})
export class DetailsFormComponent implements OnInit {
  companyForm = {} as FormGroup;
  companyData = {} as CompanyData;
  detailsForm = {} as FormGroup;
  detailsData = {} as DetailsData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.onLoad();
    this.loadDetailsData();
  };

  onLoad(): void {
    this.companyData = this.fs.getCompanyData();

    this.companyForm = this.fb.nonNullable.group({
      headlineSuggestions: this.companyData.detailsInfo.headlineSuggestions,
      subheadlineSuggestions: this.companyData.detailsInfo.subheadlineSuggestions,
      keyMessages: this.companyData.detailsInfo.keyMessages,
      callToAction: this.companyData.detailsInfo.callToAction,
      additionalContent: this.companyData.detailsInfo.additionalContent,
    });
  };

  loadDetailsData(): void {
    this.detailsData = this.fs.getDetailsData();

    this.detailsForm = this.fb.nonNullable.group({
      headlineSuggestions: this.detailsData.detailsInfo.headlineSuggestions,
      subheadlineSuggestions: this.detailsData.detailsInfo.subheadlineSuggestions,
      keyMessages: this.detailsData.detailsInfo.keyMessages,
      callToAction: this.detailsData.detailsInfo.callToAction,
      additionalContent: this.detailsData.detailsInfo.additionalContent,
    });
  };

  onCancel(): void {
    // this.fs.updateCompanyData(this.detailsForm.value);
    this.fs.updateDetailsData(this.detailsForm.value);
    this.router.navigateByUrl('/form/step-2');
  }

  onSubmit(): void {
    // this.fs.updateCompanyData(this.detailsForm.value);
    this.fs.updateDetailsData(this.detailsForm.value);
    this.router.navigateByUrl('/form/step-4');
  }
}
