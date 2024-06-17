import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormService } from './form.service';
import { CompanyData } from '../models/company-data.model';
import { Layout, Result } from '../models/api.interfaces';

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

  private layoutURL = 'assets/sample-response/layout.json';

  getMockedLayout(): Observable<Layout> {
    return this.http.get<Layout>(this.layoutURL);
  }
}
