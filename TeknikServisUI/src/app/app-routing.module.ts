import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { BodyComponent } from './body/body.component';
import { AuthGuard } from './entity/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { ServisKayitComponent } from './servis-kayit/servis-kayit.component';
import { ServisListeComponent } from './servis-liste/servis-liste.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: BodyComponent,
    children:[
      {
        path: 'anasayfa',
        canActivate: [AuthGuard],
        component: AnasayfaComponent
      },
      {
        path: 'servis-liste',
        canActivate: [AuthGuard],
        component: ServisListeComponent
      },
      {
        path: 'servis-kayit/:id',
        canActivate: [AuthGuard],
        component: ServisKayitComponent
      },
      {
        path: 'servis-kayit',
        canActivate: [AuthGuard],
        component: ServisKayitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
