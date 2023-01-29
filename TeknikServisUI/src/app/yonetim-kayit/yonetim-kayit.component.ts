import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personel } from '../entity/models/personel';
import { PersonelApiService } from '../entity/services/personel-api.service';

@Component({
  selector: 'app-yonetim-kayit',
  templateUrl: './yonetim-kayit.component.html',
  styleUrls: ['./yonetim-kayit.component.css']
})
export class YonetimKayitComponent implements OnInit {

  hataMesaji: string = '';
  kayitId: number = 0;
  personelListesi: Personel[] = [];
  private sub1: any;
  private sub2: any;

  kayitIcerik: Personel = new Personel();

  fgKayit = new FormGroup({
    id: new FormControl('', Validators.required),
    personel_adi: new FormControl('', Validators.required),
    personel_eposta: new FormControl('', Validators.required),
    personel_sifre: new FormControl('', Validators.required),
    personel_telefon: new FormControl(),
    personel_yetki: new FormControl('', Validators.required),
  });

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private webApi: PersonelApiService
  ) { }

  ngOnInit(): void {
    this.sub1 = this.rout.params.subscribe(params => {
      this.kayitId = +params['id']; // (+) converts string 'id' to a number
      if (this.kayitId) {
        // this.personelOku();
      }
      else {
        this.modelToForm();
      }
      console.log('Id: ' + this.kayitId.toString());
      });
    this.personelListesiOku();
  }

  modelToForm() {
    this.fgKayit.controls.id.setValue(this.kayitIcerik.id.toString());
    this.fgKayit.controls.personel_adi.setValue(this.kayitIcerik.personel_adi);
    this.fgKayit.controls.personel_eposta.setValue(this.kayitIcerik.personel_eposta);
    this.fgKayit.controls.personel_sifre.setValue(this.kayitIcerik.personel_sifre);
    this.fgKayit.controls.personel_telefon.setValue(this.kayitIcerik.personel_telefon);
    this.fgKayit.controls.personel_yetki.setValue(this.kayitIcerik.personel_yetki);


  }

  formToModel() {
    this.kayitIcerik.id = Number(this.fgKayit.controls.id.value);
    this.kayitIcerik.personel_adi = this.fgKayit.controls.personel_adi.value ?? '';
    this.kayitIcerik.personel_eposta = this.fgKayit.controls.personel_eposta.value ?? '';
    this.kayitIcerik.personel_sifre = this.fgKayit.controls.personel_sifre.value ?? '';
    this.kayitIcerik.personel_telefon = this.fgKayit.controls.personel_telefon.value ?? '';
    this.kayitIcerik.personel_yetki = this.fgKayit.controls.personel_yetki.value ?? '';

  }

  personelListesiOku() {
    this.sub1 = this.webApi.getPersonelListesi().subscribe({
      next: (data: Personel[]) => { this.personelListesi = data; },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  // personelOku() {
  //   this.sub2 = this.webApi.getPersonelListesi(null, this.kayitId).subscribe({
  //     next: (data: Personel[]) => {
  //       this.kayitIcerik = data[0];
  //       this.modelToForm();
  //     },
  //     error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
  //   });
  // }

  kaydet() {
    this.formToModel();
    this.webApi.postPersonel(this.kayitIcerik).subscribe({
      next: (data: Personel) => {
        this.router.navigate(['/yonetim-kayit', data.id]);
      },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.error; }
    });
  }

}
