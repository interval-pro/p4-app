import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../shared/button/button.component';
import { FormService } from '../../services/form.service';
import { CompanyData } from '../../models/company-data.model';

@Component({
  selector: 'app-design-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './design-form.component.html',
  styleUrl: './design-form.component.scss',
})
export class DesignFormComponent implements OnInit {
  designForm = {} as FormGroup;
  companyData = {} as CompanyData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyData = this.fs.getCompanyData();

    this.designForm = this.fb.nonNullable.group({
      fonts: this.companyData.fonts,
      colors: this.companyData.colors,
      toneOfVoice: this.companyData.toneOfVoice,
      additionalDesignFeatures: this.companyData.additionalDesignFeatures,
    });
  }

  onBack(): void {
    this.fs.updateCompanyData(this.designForm.value);
    this.router.navigateByUrl('/form/step-1');
  }

  onSubmit(): void {
    this.fs.updateCompanyData(this.designForm.value);
    this.router.navigateByUrl('/result');
  }

  onClick(): void {
    console.log('button clicked');
  }
}
