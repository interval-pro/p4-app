import { SafeHtml } from '@angular/platform-browser';

export interface Result {
  styles: string;
  sections: Section[];
}

export interface Section {
  HTML: string;
  CSS: string;
  safeContent?: SafeHtml;
}
