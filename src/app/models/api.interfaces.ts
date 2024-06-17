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

export interface Layout {
  inputs: string;
  mainStyle: string;
  sections: LayoutSection[];
}

export interface LayoutSection {
  sectionId: string;
  components: LayoutComponent[];
}

export interface LayoutComponent {
  componentId: string;
  type: string;
  content: string;
}
