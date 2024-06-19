import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyData } from '../models/company-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private companyData: CompanyData = this.getInitialCompanyData();

  private getInitialCompanyData(): CompanyData {
    return {
      name: '',
      industry: '',
      uniqueValueProposition: '',
      values: '',
      information: '',
      additionalInformation: '',
      fonts: '',
      colors: '',
      toneOfVoice: '',
      additionalDesignFeatures: '',
      headlineSuggestions: '',
      subheadlineSuggestions: '',
      keyMessages: '',
      callToAction: '',
      additionalContent: '',
    };
  }

  updateCompanyData(data: Partial<CompanyData>): void {
    this.companyData = { ...this.companyData, ...data };
  }

  getCompanyData(): CompanyData {
    return this.companyData;
  }

  resetCompanyData(): void {
    this.companyData = this.getInitialCompanyData();
  }
}
