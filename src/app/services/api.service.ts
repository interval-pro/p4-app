import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

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
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private fs: FormService,
  ) {}

  getLayout(): Observable<Layout> {
    return this.http.post<Layout>(
      this.apiUrl + ApiEndpoints.GENERATE_LAYOUT,
      { inputs: JSON.stringify(this.fs.companyData) },
      { params: { engineType: this.fs.engineType } }
    );
  }

  getSection(
    section: Partial<FinishedSection>
  ): Observable<GeneratedHTMLElement> {
    return this.http.post<GeneratedHTMLElement>(
      this.apiUrl + ApiEndpoints.GENERATE_SECTION,
      { initialInputs: JSON.stringify(this.fs.companyData), section },
      { params: { engineType: this.fs.engineType } }
    );
  }

  regenerateElement(
    element: GeneratedHTMLElement
  ): Observable<GeneratedHTMLElement> {
    return this.http.post<GeneratedHTMLElement>(
      this.apiUrl + ApiEndpoints.REGENERATE_ELEMENT,
      { initialInputs: JSON.stringify(this.fs.companyData), element },
      { params: { engineType: this.fs.engineType } }
    );
  }

  uploadImage(file: File): Observable<{ fileUrl: string }> {
    return Observable.create((observer: Observer<{ fileUrl: string }>) => {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        observer.next({ fileUrl: event.target.result });
        observer.complete();
      };
      fileReader.onerror = (error) => {
        observer.error(error);
      };
      fileReader.readAsDataURL(file);
    });
  }
}