import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlShortenerFormComponent } from './url-shortener-form/url-shortener-form.component';

const routes: Routes = [{path:'',component: UrlShortenerFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
