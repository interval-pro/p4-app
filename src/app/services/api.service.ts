import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormService } from './form.service';

import {
  FinishedSection,
  GeneratedSection,
  Layout,
} from '../models/api.interfaces';
import { environment } from '../../environments/environment.development';
import { ApiEndpoints } from '../constants/api-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  engineType = environment.engineType;

  constructor(private http: HttpClient, private fs: FormService) { }

  getLayout(): Observable<Layout> {
    return this.http.post<Layout>(
      this.apiUrl + ApiEndpoints.GENERATE_LAYOUT,
      { inputs: JSON.stringify(this.fs.companyData)},
      { params: { engineType: this.engineType } }
    );
  }

  getSection(section: Partial<FinishedSection>): Observable<GeneratedSection> {
    return this.http.post<GeneratedSection>(
      this.apiUrl + ApiEndpoints.GENERATE_SECTION,
      { initialInputs: JSON.stringify(this.fs.companyData), section },
      { params: { engineType: this.engineType } }
    );
  }

  private layoutURL = 'assets/sample-response/layout.json';
  getMockedLayout(): Observable<Layout> {
    return this.http.get<Layout>(this.layoutURL);
  }

  getMockedSection(
    section: Partial<FinishedSection>
  ): Observable<GeneratedSection> {
    let url = '';

    for (const sectionURL of sectionsURLs) {
      if (sectionURL.sectionId == section.sectionId) url = sectionURL.url;
    }

    return this.http.post<GeneratedSection>(url, section);
  }
}

const sectionsURLs = [
  {
    sectionId: 'header',
    url: 'assets/sample-response/1716148666288/header.json',
  },
  {
    sectionId: 'hero',
    url: 'assets/sample-response/1716148666288/hero.json',
  },
  {
    sectionId: 'features',
    url: 'assets/sample-response/1716148666288/features.json',
  },
  {
    sectionId: 'testimonials',
    url: 'assets/sample-response/1716148666288/testimonials.json',
  },
  {
    sectionId: 'footer',
    url: 'assets/sample-response/1716148666288/footer.json',
  },
];