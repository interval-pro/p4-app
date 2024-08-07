import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  designForm = this.fb.group({
    fonts: [this.fs.designData.fonts, Validators.required],
    colors: [this.fs.designData.colors, Validators.required],
    toneOfVoice: [this.fs.designData.toneOfVoice, Validators.required],
    imageryStyle: [this.fs.designData.imageryStyle, Validators.required],
    additionalDesignFeatures: [this.fs.designData.additionalDesignFeatures, Validators.required],
  });

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

  get isButtonDisabled(): boolean {
    return this.designForm.invalid;
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
