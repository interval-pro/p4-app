import { Injectable } from '@angular/core';

import { BusinessData, DesignData, DetailsData, MediaData, CompanyData } from '../models/company-data.model';

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

const getInitialMediaData = (): MediaData => {
  return { };
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _businessData: BusinessData = getInitialBusinessData();
  private _designData: DesignData = getInitialDesignData();
  private _detailsData: DetailsData = getInitialDetailsData();
  private _mediaData: MediaData = getInitialMediaData();

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

  get mediaData(): MediaData {
    return this._mediaData;
  }

  set mediaData(data: Partial<MediaData>) {
    this._mediaData = {...this._mediaData, ...data};
  };

  get companyData(): CompanyData {
    return {
      businessInfo: this._businessData,
      designInfo: this._designData,
      detailsInfo: this._detailsData,
      mediaInfo: this._mediaData,
    };
  }
};
