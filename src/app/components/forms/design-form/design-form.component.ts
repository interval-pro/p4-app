import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData, DesignData } from '../../../models/company-data.model';

@Component({
  selector: 'app-design-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './design-form.component.html',
  styleUrl: './design-form.component.scss',
})
export class DesignFormComponent implements OnInit {
  companyForm = {} as FormGroup;
  designForm = {} as FormGroup;
  companyData = {} as CompanyData;
  designData = {} as DesignData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.loadCompanyData();
    this.loadDesignData();
  };

  loadCompanyData(): void {
    this.companyData = this.fs.getCompanyData();
  };

  loadDesignData(): void {
    this.designData = this.fs.getDesignData();

    this.designForm = this.fb.nonNullable.group({
      fonts: this.designData.designInfo.fonts,
      colors: this.designData.designInfo.colors,
      toneOfVoice: this.designData.designInfo.toneOfVoice,
      imageryStyle: this.designData.designInfo.imageryStyle,
      additionalDesignFeatures: this.designData.designInfo.additionalDesignFeatures,
    });
  };

  onBack(): void {
    this.fs.updateDesignData(this.designForm.value);
    this.router.navigateByUrl('/form/step-1');
  };

  onSubmit(): void {
    this.fs.updateDesignData(this.designForm.value);
    this.companyData.designInfo = this.designData.designInfo;
    this.router.navigateByUrl('/form/step-3');
  };
};
