export interface CompanyData {
  businessInfo: BusinessData;
  designInfo: DesignData;
  detailsInfo: DetailsData;
};

export interface BusinessData {
  name: string;
  industry: string;
  uniqueValues: string;
  coreValues: string;
  businessDescription: string;
  targetAudience: string;
  goals: string;
};

export interface DesignData {
  fonts: string;
  colors: string;
  toneOfVoice: string;
  imageryStyle: string;
  additionalDesignFeatures: string;
};

export interface DetailsData {
  headlineSuggestions: string;
  subheadlineSuggestions: string;
  keyMessages: string;
  callToAction: string;
  additionalContent: string;
};