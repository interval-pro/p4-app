import { Component } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { CompanyData } from '../../../models/company-data.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/button/button.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormsModule],

  templateUrl: './preview.component.html',
  styleUrl: '../forms.scss',
})
export class PreviewComponent {
  constructor(
    private fs: FormService,
    private router: Router,
  ) {}

  get selectedEngine() {
    return this.fs.engineType;
  }

  set selectedEngine(type: number) {
    this.fs.engineType = type;
  }

  get companyData(): CompanyData {
    return this.fs.companyData;
  }

  get isButtonDisabled(): boolean {
    return !this.fs.isTotalCompleted;
  }

  onCancel(): void {
    this.router.navigateByUrl('/form/step-3');
  }

  onSubmit(): void {
    this.router.navigateByUrl('/result');
  }
};