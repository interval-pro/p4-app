import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormService } from './form.service';

import {
  FinishedSection,
  GeneratedHTMLElement,
  Layout,
} from '../models/api.interfaces';
import { environment } from '../../environments/environment.development';
import { ApiEndpoints } from '../constants/api.enums';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  engineType = environment.engineType;

  constructor(private http: HttpClient, private fs: FormService) {}

  getLayout(): Observable<Layout> {
    return this.http.post<Layout>(
      this.apiUrl + ApiEndpoints.GENERATE_LAYOUT,
      { inputs: JSON.stringify(this.fs.companyData) },
      { params: { engineType: this.engineType } }
    );
  }

  getSection(
    section: Partial<FinishedSection>
  ): Observable<GeneratedHTMLElement> {
    return this.http.post<GeneratedHTMLElement>(
      this.apiUrl + ApiEndpoints.GENERATE_SECTION,
      { initialInputs: JSON.stringify(this.fs.companyData), section },
      { params: { engineType: this.engineType } }
    );
  }

  regenerateElement(
    element: GeneratedHTMLElement
  ): Observable<GeneratedHTMLElement> {
    return this.http.post<GeneratedHTMLElement>(
      this.apiUrl + ApiEndpoints.REGENERATE_ELEMENT,
      { initialInputs: JSON.stringify(this.fs.companyData), element },
      { params: { engineType: this.engineType } }
    );
  }

  uploadImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<{ fileUrl: string }>(
      this.apiUrl + ApiEndpoints.UPLOAD_IMAGE,
      formData
    );
  }

  // Mocked API calls for development

  mockRegenerateElement(
    element: GeneratedHTMLElement
  ): Observable<GeneratedHTMLElement> {
    return this.http.get<GeneratedHTMLElement>(
      'assets/sample-response/regenerate.json'
    );
  }

  mockUploadImage(file: File): Observable<{ fileUrl: string }> {
    return this.http.get<{ fileUrl: string }>(
      'assets/sample-response/upload.json'
    );
  }

  getMockedLayout(): Observable<Layout> {
    return this.http.get<Layout>('assets/sample-response/layout.json');
  }

  getMockedSection(
    section: Partial<FinishedSection>
  ): Observable<GeneratedHTMLElement> {
    let url = '';

    for (const sectionURL of sectionsURLs) {
      if (sectionURL.sectionId == section.sectionId) url = sectionURL.url;
    }

    return this.http.post<GeneratedHTMLElement>(url, section);
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
