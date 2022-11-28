import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { ServisKayitComponent } from './servis-kayit/servis-kayit.component';
import { ServisListeComponent } from './servis-liste/servis-liste.component';

const routes: Routes = [
  {
    path: '',
    component: AnasayfaComponent,
    children:[
      {
        path: 'servis-liste',
        component: ServisListeComponent
      },
      {
        path: 'servis-kayit/:id',
        component: ServisKayitComponent
      },
      {
        path: 'servis-kayit',
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
