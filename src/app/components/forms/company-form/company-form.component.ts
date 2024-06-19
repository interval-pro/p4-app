import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData } from '../../../models/company-data.model';

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

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyData = this.fs.getCompanyData();

    this.companyForm = this.fb.nonNullable.group({
      name: this.companyData.name,
      industry: this.companyData.industry,
      uniqueValueProposition: this.companyData.uniqueValueProposition,
      values: this.companyData.values,
      information: this.companyData.information,
      additionalInformation: this.companyData.additionalInformation,
    });
  }

  onCancel(): void {
    this.fs.resetCompanyData();
    this.router.navigateByUrl('/home');
  }

  onSubmit(): void {
    this.fs.updateCompanyData(this.companyForm.value);
    this.router.navigateByUrl('/form/step-2');
  }
}
