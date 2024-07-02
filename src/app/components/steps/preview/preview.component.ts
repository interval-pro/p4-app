import { Component } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { CompanyData } from '../../../models/company-data.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, ButtonComponent],

  templateUrl: './preview.component.html',
  styleUrl: '../forms.scss',
})
export class PreviewComponent {
  constructor(
    private fs: FormService,
    private router: Router,
  ) {}

  get companyData(): CompanyData {
    return this.fs.companyData;
  }

  onCancel(): void {
    this.router.navigateByUrl('/form/step-4');
  }

  onSubmit(): void {
    this.router.navigateByUrl('/result');
  }
};