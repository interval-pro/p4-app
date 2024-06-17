import { SafeHtml } from '@angular/platform-browser';
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

export interface GeneratedSection {
  HTML: string;
  CSS: string;
  safeContent?: SafeHtml;
}

export interface FinishedSection extends LayoutSection, GeneratedSection {}
