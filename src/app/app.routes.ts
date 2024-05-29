import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { DesignFormComponent } from './components/design-form/design-form.component';
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
  { path: 'result', component: ResultComponent },
];
