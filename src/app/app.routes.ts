import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompanyFormComponent } from './components/forms/company-form/company-form.component';
import { DesignFormComponent } from './components/forms/design-form/design-form.component';
import { DetailsFormComponent } from './components/forms/details-form/details-form.component';
import { MediaFormComponent } from './components/forms/media-form/media-form.component';
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
  { path: 'result', component: ResultComponent },
];
