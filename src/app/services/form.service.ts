import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompanyData, BusinessData, DesignData, DetailsData, MediaData } from '../models/company-data.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private companyData: CompanyData = this.getInitialCompanyData();
  private businessData: BusinessData = this.getInitialBusinessData();
  private designData: DesignData = this.getInitialDesignData();
  private detailsData: DetailsData = this.getInitialDetailsData();
  private mediaData: MediaData = this.getInitialMediaData();

  private getInitialCompanyData(): CompanyData {
    // return {
    // name: '',
    // industry: '',
    // uniqueValues: '',
    // coreValues: '',
    // businessDescription: '',
    // targetAudience: '',
    // goals: '',
      // fonts: '',
      // colors: '',
      // toneOfVoice: '',
      // imageryStyle: '',
      // additionalDesignFeatures: '',
      // headlineSuggestions: '',
      // subheadlineSuggestions: '',
      // keyMessages: '',
      // callToAction: '',
      // additionalContent: '',
    // };
    return {
      businessInfo: {
        name: '',
        industry: '',
        uniqueValues: '',
        coreValues: '',
        businessDescription: '',
        targetAudience: '',
        goals: '',
      },
      designInfo: {
        fonts: '',
        colors: '',
        toneOfVoice: '',
        imageryStyle: '',
        additionalDesignFeatures: '',
      },
      detailsInfo: {
        headlineSuggestions: '',
        subheadlineSuggestions: '',
        keyMessages: '',
        callToAction: '',
        additionalContent: '',
      },
    }
  };

  private getInitialBusinessData(): BusinessData {
    return {
      businessInfo: {
        name: '',
        industry: '',
        uniqueValues: '',
        coreValues: '',
        businessDescription: '',
        targetAudience: '',
        goals: '',
      },
    }
  };

  private getInitialDesignData(): DesignData {
    return {
      designInfo: {
        fonts: '',
        colors: '',
        toneOfVoice: '',
        imageryStyle: '',
        additionalDesignFeatures: '',
      },
    }
  };

  private getInitialDetailsData(): DetailsData {
    return {
      detailsInfo: {
        headlineSuggestions: '',
        subheadlineSuggestions: '',
        keyMessages: '',
        callToAction: '',
        additionalContent: '',
      },
    }
  };

  private getInitialMediaData(): MediaData {
    return {

    }
  };

  updateCompanyData(data: Partial<CompanyData>): void {
    this.companyData = { ...this.companyData, ...data };
  };

  getCompanyData(): CompanyData {
    return this.companyData;
  };

  updateBusinessData(data: Partial<BusinessData>): void {
    this.businessData.businessInfo = {...this.businessData.businessInfo, ...data};
  };

  getBusinessData(): BusinessData {
    return this.businessData;
  };

  updateDesignData(data: Partial<DesignData>): void {
    this.designData.designInfo = {...this.designData.designInfo, ...data};
  };

  getDesignData(): DesignData {
    return this.designData;
  };

  updateDetailsData(data: Partial<DetailsData>): void {
    this.detailsData.detailsInfo = {...this.detailsData.detailsInfo, ...data};
  };

  getDetailsData(): DetailsData {
    return this.detailsData;
  };

  updateMediaData(data: Partial<MediaData>): void {
    this.mediaData = {...this.mediaData, ...data};
  };

  getMediaData(): MediaData {
    return this.mediaData;
  }

  resetCompanyData(): void {
    this.companyData = this.getInitialCompanyData();
  };
};
