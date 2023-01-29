import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ServisListeComponent } from './servis-liste/servis-liste.component';
import { ServisKayitComponent } from './servis-kayit/servis-kayit.component';
import { AnasayfaComponent } from './anasayfa/anasayfa.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './entity/services/auth.guard';
import { BodyComponent } from './body/body.component';
import { YonetimLoginComponent } from './yonetim-login/yonetim-login.component';
import { YonetimPanelComponent } from './yonetim-panel/yonetim-panel.component';
import { AuthyonetimGuard } from './entity/services/authyonetim.guard';
import { YonetimKayitComponent } from './yonetim-kayit/yonetim-kayit.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ServisListeComponent,
    ServisKayitComponent,
    AnasayfaComponent,
    LoginComponent,
    BodyComponent,
    YonetimLoginComponent,
    YonetimPanelComponent,
    YonetimKayitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule    
  ],
  providers: [AuthGuard, AuthyonetimGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
