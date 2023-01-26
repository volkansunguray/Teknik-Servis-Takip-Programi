import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personel } from '../entity/models/personel';
import { AuthService } from '../entity/services/auth.service';
import { ServisApiService } from '../entity/services/servis-api.service';

@Component({
  selector: 'app-yonetim-login',
  templateUrl: './yonetim-login.component.html',
  styleUrls: ['./yonetim-login.component.css']
})
export class YonetimLoginComponent implements OnInit {
  loading: boolean = false;
  error: string = '';
  hataMesaji: string = '';
  yetki: string = '';

  fgPersonel = new FormGroup({
    personel_eposta: new FormControl('', Validators.required),
    personel_sifre: new FormControl('', Validators.required),
  });

  constructor(
    // private formBuilder: FormBuilder,
    private webApi: ServisApiService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //
  }

  // personelOku() {
  //   this.webApi.getPersonelListesi().subscribe({
  //     next: (data: Personel[]) => { this.personelListesi = data; },
  //     error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
  //   });
  // }

  /*formToModel() {
    this.personelListesi[0].id = Number(this.fgPersonel.controls.personel_id.value);
    this.personelListesi[1].personel_adi = this.fgPersonel.controls.personel_adi.value ?? '';
    this.personelListesi[2].personel_eposta = this.fgPersonel.controls.personel_eposta.value ?? '';
    this.personelListesi[3].personel_sifre = this.fgPersonel.controls.personel_sifre.value ?? '';
  }*/

  //get f() {
  //  return this.fgPersonel.controls;
  //}

  /*onSubmit() {
    this.authSvc.login(this.f.personel_eposta.value, this.f.personel_sifre.value).subscribe(apiResponse: Personel);

  }*/

  onSubmit() {
    //this.submitted = true;
    this.loading = true;
    this.error = '';
    let username = this.fgPersonel.controls.personel_eposta.value ?? '';
    let pass = this.fgPersonel.controls.personel_sifre.value ?? '';
    this.authSvc.login(username, pass).subscribe(
        (apiResponse: Personel) => {
          localStorage.setItem('loginYonetim', username);
          this.router.navigate(['/yonetim-panel']);
    
          /*
          if (apiResponse.success) {
            localStorage.setItem('currentUser', JSON.stringify(apiResponse.data.items[0]));
            // gereksiz localStorage.setItem('ExpirationDate', new Date().getDate().toString());
            this.authSvc.currentUserSubject = new BehaviorSubject<PersonelModel>(apiResponse.data.items[0]);
            this.authSvc.currentUser = this.authSvc.currentUserSubject.asObservable();
            this.router.navigate(['/radyoloji-islem-kayit']);
          }
          else
          {
            this.error = apiResponse.message;
          }
          this.loading = false;
          */
        },
        error => {
          this.error = error.error;
          this.loading = false;
        }
      );
  }


}
