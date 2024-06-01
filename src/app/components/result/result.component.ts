import { Component } from '@angular/core';
import { FormService } from '../../services/form.service';
import { CompanyData } from '../../models/company-data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(private fs: FormService) {}

  data: CompanyData = this.fs.getCompanyData();
}
