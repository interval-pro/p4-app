import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
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
  businessForm = this.fb.group<BusinessData>(this.businessData);

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

  onBack(): void {
    this.router.navigateByUrl('/home');
  };

  onSubmit(): void {
    this.businessData = this.businessForm.value as Partial<BusinessData>;
    this.router.navigateByUrl('/form/step-2');
  };
};
