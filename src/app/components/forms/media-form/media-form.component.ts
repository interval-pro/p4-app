import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { CompanyData } from '../../../models/company-data.model';

@Component({
  selector: 'app-media-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './media-form.component.html',
  styleUrl: './media-form.component.scss',
})
export class MediaFormComponent implements OnInit {
  mediaForm = {} as FormGroup;
  companyData = {} as CompanyData;

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyData = this.fs.getCompanyData();

    this.mediaForm = this.fb.nonNullable.group({
    });
  }

  onCancel(): void {
    this.fs.updateMediaData(this.mediaForm.value);
    this.router.navigateByUrl('/form/step-3');
  }

  onSubmit(): void {
    this.fs.updateMediaData(this.mediaForm.value);
    this.router.navigateByUrl('/result');
  }
}
