import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData, BusinessData } from '../../../models/company-data.model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  companyForm = {} as FormGroup;
  companyData = {} as CompanyData;
  businessForm = {} as FormGroup;
  businessData = {} as BusinessData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.onLoad();
    this.loadBusinessData();
  };

  onLoad(): void {
    this.companyData = this.fs.getCompanyData();

    this.companyForm = this.fb.nonNullable.group({
      name: this.companyData.businessInfo.name,
      industry: this.companyData.businessInfo.industry,
      uniqueValues: this.companyData.businessInfo.uniqueValues,
      coreValues: this.companyData.businessInfo.coreValues,
      businessDescription: this.companyData.businessInfo.businessDescription,
      targetAudience: this.companyData.businessInfo.targetAudience,
      goals: this.companyData.businessInfo.goals,
    });
  };

  loadBusinessData(): void {
    this.businessData = this.fs.getBusinessData();

    this.businessForm = this.fb.nonNullable.group({
      name: this.businessData.businessInfo.name,
      industry: this.businessData.businessInfo.industry,
      uniqueValues: this.businessData.businessInfo.uniqueValues,
      coreValues: this.businessData.businessInfo.coreValues,
      businessDescription: this.businessData.businessInfo.businessDescription,
      targetAudience: this.businessData.businessInfo.targetAudience,
      goals: this.businessData.businessInfo.goals,
    });
  }

  onCancel(): void {
    this.fs.resetCompanyData();
    this.router.navigateByUrl('/home');
  };

  onSubmit(): void {
    // this.fs.updateCompanyData(this.companyForm.value);
    this.fs.updateBusinessData(this.businessForm.value);
    this.router.navigateByUrl('/form/step-2');
  };
};
