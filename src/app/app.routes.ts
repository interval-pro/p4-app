import { Routes } from '@angular/router';
import { HomeComponent } from './components/steps/home/home.component';
import { CompanyFormComponent } from './components/steps/company-form/company-form.component';
import { DesignFormComponent } from './components/steps/design-form/design-form.component';
import { DetailsFormComponent } from './components/steps/details-form/details-form.component';
import { MediaFormComponent } from './components/steps/media-form/media-form.component';
import { PreviewComponent } from './components/steps/preview/preview.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  { path: 'home', component: HomeComponent },
  { path: 'form/step-1', component: CompanyFormComponent },
  { path: 'form/step-2', component: DesignFormComponent },
  { path: 'form/step-3', component: DetailsFormComponent },
  { path: 'form/step-4', component: MediaFormComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'result', component: ResultComponent },
];
