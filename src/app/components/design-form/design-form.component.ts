import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../shared/button/button.component';
import { FormService } from '../../services/form.service';
import { CompanyData } from '../../models/company-data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, CommonModule],
  templateUrl: './design-form.component.html',
  styleUrl: './design-form.component.scss',
})
export class DesignFormComponent implements OnInit {
  designForm = {} as FormGroup;
  companyData = {} as CompanyData;
  font: string = ''; // default font?
  toneOfVoice: string = ''; // default tone of voice?
  selectedFont: string = '';
  selectedToneOfVoice: string = '';
  primaryColor: string = ''; // default primary color?
  secondaryColor: string = ''; // default secondary color?
  accentColor: string = ''; // default accent color?
  selectedPrimaryColor: string = '';
  selectedSecondaryColor: string = '';
  selectedAccentColor: string = '';

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit(): void {
    this.companyData = this.fs.getCompanyData();
    this.designForm = this.fb.nonNullable.group({
      fonts: this.companyData.fonts,
      toneOfVoice: this.companyData.toneOfVoice,
      primaryColor: this.companyData.primaryColor,
      secondaryColor: this.companyData.secondaryColor,
      accentColor: this.companyData.accentColor,
      additionalDesignFeatures: this.companyData.additionalDesignFeatures,
    });
  }

  onLoad(): void {
    this.companyData = this.fs.getCompanyData();
    this.designForm = this.fb.nonNullable.group({
      fonts: this.selectedFont,
      toneOfVoice: this.selectedToneOfVoice,
      primaryColor: this.selectedPrimaryColor,
      secondaryColor: this.selectedSecondaryColor,
      accentColor: this.selectedAccentColor,
      additionalDesignFeatures: this.companyData.additionalDesignFeatures,
    });
  }

  onBack(): void {
    this.fs.updateCompanyData(this.designForm.value);
    this.router.navigateByUrl('/form/step-1');
  }

  onSubmit(): void {
    // TODO: check if font and tone of voice are valid
    this.fs.updateCompanyData(this.designForm.value);
    this.router.navigateByUrl('/result');
  }

  onChange(): void {
    this.selectedFont = this.companyData.fonts;
    this.selectedToneOfVoice = this.companyData.toneOfVoice;
    this.selectedPrimaryColor = this.companyData.primaryColor;
    this.selectedSecondaryColor = this.companyData.secondaryColor;
    this.selectedAccentColor = this.companyData.accentColor;
  }

  onClickFont(event: any): void {
    this.font = event.target.innerHTML;
    this.companyData.fonts = this.font;
    this.onChange();
    this.onLoad();
  }

  onClickVoice(event: any): void {
    this.toneOfVoice = event.target.innerHTML
    this.companyData.toneOfVoice = this.toneOfVoice;
    this.onChange();
    this.onLoad();
  }

  onPrimaryColor(event: any): void {
    this.primaryColor = event.target.value;
    this.companyData.primaryColor = this.primaryColor;
    this.onChange();
    this.onLoad();
  }

  onSecondaryColor(event: any): void {
    this.secondaryColor = event.target.value;
    this.companyData.secondaryColor = this.secondaryColor;
    this.onChange();
    this.onLoad();
  }

  onAccentColor(event: any): void {
    this.accentColor = event.target.value;
    this.companyData.accentColor = this.accentColor;
    this.onChange();
    this.onLoad();
  }
}
