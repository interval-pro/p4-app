import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { FormService } from '../../../services/form.service';
import { MediaData } from '../../../models/company-data.model';

@Component({
  selector: 'app-media-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './media-form.component.html',
  styleUrl: '../forms.scss',
})
export class MediaFormComponent {
  mediaForm = this.fb.group<MediaData>(this.mediaData);

  constructor(
    private fb: FormBuilder,
    private fs: FormService,
    private router: Router
  ) { }


  get mediaData(): MediaData {
    return this.fs.mediaData;
  }

  set mediaData(data: Partial<MediaData>) {
    this.fs.mediaData = data;
  }

  onBack(): void {
    this.mediaData = this.mediaForm.value as Partial<MediaData>;
    this.router.navigateByUrl('/form/step-3');
  }

  onSubmit(): void {
    this.mediaData = this.mediaForm.value as Partial<MediaData>;
    this.router.navigateByUrl('/preview');
  }
}
