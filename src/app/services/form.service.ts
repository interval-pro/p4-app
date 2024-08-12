import { Injectable } from '@angular/core';

import { BusinessData, DesignData, DetailsData, CompanyData } from '../models/company-data.model';

const getInitialBusinessData = (): BusinessData => {
  return {
    name: '',
    industry: '',
    uniqueValues: '',
    coreValues: '',
    businessDescription: '',
    targetAudience: '',
    goals: '',
  };
};

const getInitialDesignData = (): DesignData =>  {
  return {
    fonts: '',
    colors: '',
    toneOfVoice: '',
    imageryStyle: '',
    additionalDesignFeatures: '',
  };
};


const getInitialDetailsData = (): DetailsData => {
  return {
    headlineSuggestions: '',
    subheadlineSuggestions: '',
    keyMessages: '',
    callToAction: '',
    additionalContent: '',
  };
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _engineType = 0;
  private _businessData: BusinessData = getInitialBusinessData();
  private _designData: DesignData = getInitialDesignData();
  private _detailsData: DetailsData = getInitialDetailsData();

  get engineType(): number {
    return this._engineType;
  }

  set engineType(type: number) {
    this._engineType = type;
  }

  get businessData(): BusinessData {
    return this._businessData;
  }

  set businessData(data: Partial<BusinessData>) {
    this._businessData = { ...this._businessData, ...data };
  };

  get designData(): DesignData {
    return this._designData;
  };

  set designData(data: Partial<DesignData>) {
    this._designData = { ...this._designData, ...data };
  };

  get detailsData(): DetailsData {
    return this._detailsData;
  }

  set detailsData(data: Partial<DetailsData>) {
    this._detailsData = { ...this._detailsData, ...data };
  };

  get companyData(): CompanyData {
    // return {
    //   businessInfo: {
    //     name: 'VoltBlast Energy',
    //     industry: 'Beverages',
    //     uniqueValues: 'Instant energy boost, Natural ingredients, Low sugar',
    //     coreValues: 'Sustainability, Innovation, Customer health',
    //     businessDescription: 'VoltBlast Energy offers a range of energy drinks designed to provide a healthy, sustainable energy boost with natural ingredients.',
    //     targetAudience: 'Young adults, Sports enthusiasts, Health-conscious consumers',
    //     goals: 'Expand market reach, Enhance brand recognition, Launch new flavors'
    //   },
    //   designInfo: {
    //     fonts: 'Bold, modern sans-serif',
    //     colors: 'Electric blue, neon green, black',
    //     toneOfVoice: 'Energetic, confident, motivational',
    //     imageryStyle: 'Dynamic action shots, vibrant and energetic themes',
    //     additionalDesignFeatures: 'Futuristic elements, focus on motion and energy'
    //   },
    //   detailsInfo: {
    //     headlineSuggestions: 'Unleash Your Potential with VoltBlast!',
    //     subheadlineSuggestions: 'Feel the Energy, Not the Sugar',
    //     keyMessages: 'Designed for your peak performance, Harness natural energy, Stay energized longer',
    //     callToAction: 'Grab Your VoltBlast Today!',
    //     additionalContent: 'Customer testimonials, Infographics about health benefits, Sponsored athlete endorsements'
    //   },
    // };

    return {
      businessInfo: this._businessData,
      designInfo: this._designData,
      detailsInfo: this._detailsData,
    };
  }

  get isTotalCompleted() {
    return Object.values(this.companyData)
      .map((value) => Object.values(value))
      .flat()
      .every((value) => value);
  }
};
