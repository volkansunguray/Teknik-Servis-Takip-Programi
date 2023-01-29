import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personel } from '../entity/models/personel';
import { AuthService } from '../entity/services/auth.service';
import { AuthyonetimService } from '../entity/services/authyonetim.service';
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
    private authSvc: AuthyonetimService,
    private router: Router
  ) { }

  ngOnInit() {
  }


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
        },
        error => {
          this.error = error.error;
          this.loading = false;
        }
      );
  }


}
