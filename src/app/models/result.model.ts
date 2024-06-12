import { SafeHtml } from '@angular/platform-browser';

export interface Result {
  styles: string;
  body: string;
  sections: Section[];
  safeContent?: SafeHtml;
}

export interface Section {
  HTML: string;
  CSS: string;
  safeContent?: SafeHtml;
}
