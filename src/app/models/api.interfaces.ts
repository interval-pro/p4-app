export interface Layout {
  inputs: string;
  mainStyle: string;
  sections: LayoutSection[];
}

export interface LayoutSection {
  sectionId: string;
  components: LayoutComponent[];
  isLoading?: boolean;
}

export interface LayoutComponent {
  componentId: string;
  type: string;
  content: string;
}

export interface GeneratedSection {
  sectionId: string;
  HTML: string;
  CSS: string;
}

export interface FinishedSection extends LayoutSection, GeneratedSection {}
