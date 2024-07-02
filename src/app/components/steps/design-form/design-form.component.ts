import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { DesignData } from '../../../models/company-data.model';

@Component({
  selector: 'app-design-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './design-form.component.html',
  styleUrl: '../forms.scss',
})
export class DesignFormComponent {
  designForm = this.fb.group<DesignData>(this.designData)

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) { };

  get designData(): DesignData {
    return this.fs.designData;
  }

  set designData(data: Partial<DesignData>) {
    this.fs.designData = data;
  }

  onBack(): void {
    this.designData = this.designForm.value as Partial<DesignData>;
    this.router.navigateByUrl('/form/step-1');
  };

  onSubmit(): void {
    this.designData = this.designForm.value as Partial<DesignData>;
    this.router.navigateByUrl('/form/step-3');
  };
};
