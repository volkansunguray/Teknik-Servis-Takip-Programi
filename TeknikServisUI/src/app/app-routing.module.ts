import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { BodyComponent } from './body/body.component';
import { AuthGuard } from './entity/services/auth.guard';
import { AuthyonetimGuard } from './entity/services/authyonetim.guard';
import { LoginComponent } from './login/login.component';
import { ServisKayitComponent } from './servis-kayit/servis-kayit.component';
import { ServisListeComponent } from './servis-liste/servis-liste.component';
import { YonetimKayitComponent } from './yonetim-kayit/yonetim-kayit.component';
import { YonetimLoginComponent } from './yonetim-login/yonetim-login.component';
import { YonetimPanelComponent } from './yonetim-panel/yonetim-panel.component';

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
      },
      {
        path: 'yonetim-login',
        canActivate: [AuthGuard],
        component: YonetimLoginComponent
      },
      {
        path: 'yonetim-panel',
        canActivate: [AuthyonetimGuard],
        component: YonetimPanelComponent
      },
      {
        path: 'yonetim-kayit',
        canActivate: [AuthyonetimGuard],
        component: YonetimKayitComponent
      }
    ]
  }
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
