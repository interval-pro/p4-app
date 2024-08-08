export interface Layout {
  inputs: string;
  mainStyle: string;
  sections: LayoutSection[];
}

export interface LayoutSection {
  sectionId: string;
  components: LayoutComponent[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface LayoutComponent {
  componentId: string;
  type: string;
  content: string;
}

export interface GeneratedHTMLElement {
  HTML: string;
  CSS: string;
}

export interface FinishedSection extends LayoutSection, GeneratedHTMLElement {}
