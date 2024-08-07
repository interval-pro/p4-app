import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { BusinessData } from '../../../models/company-data.model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './company-form.component.html',
  styleUrl: '../forms.scss',
})
export class CompanyFormComponent {
  businessForm = this.fb.group({
    name: [this.fs.businessData.name, Validators.required],
    industry: [this.fs.businessData.industry, Validators.required],
    uniqueValues: [this.fs.businessData.uniqueValues, Validators.required],
    coreValues: [this.fs.businessData.coreValues, Validators.required],
    businessDescription: [this.fs.businessData.businessDescription, Validators.required],
    targetAudience: [this.businessData.targetAudience, Validators.required],
    goals: [this.businessData.goals, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) { }

  get businessData(): BusinessData {
    return this.fs.businessData;
  }

  set businessData(data: Partial<BusinessData>) {
    this.fs.businessData = data;
  }

  get isButtonDisabled(): boolean {
    return this.businessForm.invalid;
  }

  onBack(): void {
    this.router.navigateByUrl('/home');
  };

  onSubmit(): void {
    this.businessData = this.businessForm.value as Partial<BusinessData>;
    this.router.navigateByUrl('/form/step-2');
  };
};
