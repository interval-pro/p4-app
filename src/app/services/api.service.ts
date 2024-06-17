import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormService } from './form.service';
import { CompanyData } from '../models/company-data.model';
import { GeneratedSection, Layout } from '../models/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  companyData = {} as CompanyData;

  constructor(private http: HttpClient, private fs: FormService) {}

  // Mocking response for development purposes
  private layoutURL = 'assets/sample-response/layout.json';

  getMockedLayout(): Observable<Layout> {
    return this.http.get<Layout>(this.layoutURL);
  }

  private sectionsURLs = [
    'assets/sample-response/1716148666288/header.json',
    'assets/sample-response/1716148666288/hero.json',
    'assets/sample-response/1716148666288/features.json',
    'assets/sample-response/1716148666288/testimonials.json',
    'assets/sample-response/1716148666288/footer.json',
  ];

  private currentSection: number = 0;

  getSection(): Observable<GeneratedSection> {
    if (this.currentSection > this.sectionsURLs.length) this.currentSection = 0;

    return this.http.get<GeneratedSection>(
      this.sectionsURLs[this.currentSection++]
    );
  }
}
