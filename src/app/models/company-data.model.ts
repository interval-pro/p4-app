// export interface CompanyData {
//   name: string;
//   industry: string;
//   uniqueValues: string;
//   coreValues: string;
//   businessDescription: string;
//   targetAudience: string;
//   goals: string;
//   fonts: string;
//   colors: string;
//   toneOfVoice: string;
//   imageryStyle: string;
//   additionalDesignFeatures: string;
//   headlineSuggestions: string;
//   subheadlineSuggestions: string;
//   keyMessages: string;
//   callToAction: string;
//   additionalContent: string;
// };

export interface CompanyData extends BusinessData, DesignData, DetailsData {};

export interface BusinessData {
  businessInfo: {
    name: string;
    industry: string;
    uniqueValues: string;
    coreValues: string;
    businessDescription: string;
    targetAudience: string;
    goals: string;
  }
};

export interface DesignData {
  designInfo: {
    fonts: string;
    colors: string;
    toneOfVoice: string;
    imageryStyle: string;
    additionalDesignFeatures: string;
  }
};

export interface DetailsData {
  detailsInfo: {
    headlineSuggestions: string;
    subheadlineSuggestions: string;
    keyMessages: string;
    callToAction: string;
    additionalContent: string;
  }
};

export interface MediaData {

};