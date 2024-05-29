import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormService } from './form.service';
import { CompanyData } from '../models/company-data.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  companyData = {} as CompanyData;

  constructor(private http: HttpClient, private fs: FormService) {}

  submitCompanyData(): Observable<any> {
    this.companyData = this.fs.getCompanyData();

    return this.http.post('apiUrl', this.companyData);
  }

  regenerateSection(): void {
    // to be implemented
  }

  regenerateImage(): void {
    // to be implemented
  }
}
