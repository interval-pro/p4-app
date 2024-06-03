import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormService } from './form.service';
import { CompanyData } from '../models/company-data.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  companyData = {} as CompanyData;

  constructor(private http: HttpClient, private fs: FormService) {}

  // Mocking response for development purposes
  private mockedApiUrl = 'assets/mockedAPIresponse1716148666288.json';

  getMockedData(): Observable<Result> {
    this.companyData = this.fs.getCompanyData();

    return this.http.post<Result>(this.mockedApiUrl, this.companyData);
  }
}
