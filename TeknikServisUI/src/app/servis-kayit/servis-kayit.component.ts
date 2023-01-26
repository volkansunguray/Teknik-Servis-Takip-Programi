import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personel } from '../entity/models/personel';
import { Servis } from '../entity/models/servis';
import { ServisApiService } from '../entity/services/servis-api.service';

@Component({
  selector: 'app-servis-kayit',
  templateUrl: './servis-kayit.component.html',
  styleUrls: ['./servis-kayit.component.css']
})
export class ServisKayitComponent implements OnInit {
  kayitId: number = 0;
  kayitIcerik: Servis = new Servis();
  personelListesi: Personel[] = [];
  hataMesaji: string = '';
  private sub1: any;
  private sub2: any;

  fgKayit = new FormGroup({
    id: new FormControl('', Validators.required),
    servis_tanim: new FormControl('', Validators.required),
    servis_aciklama: new FormControl(),
    baslangic_tarihi: new FormControl(Date(), Validators.required),
    servis_saati: new FormControl(Date(), Validators.required),
    teslim_tarihi: new FormControl(),
    personel_id: new FormControl(0, Validators.required),
    ariza_durum: new FormControl(0, Validators.required),
    yapilan_islem: new FormControl('')
  });

  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private webApi: ServisApiService
  ) { }

  ngOnInit(): void {
    this.sub1 = this.rout.params.subscribe(params => {
      this.kayitId = +params['id']; // (+) converts string 'id' to a number
      if (this.kayitId) {
        this.servisOku();
      }
      else {
        this.kayitIcerik.baslangic_tarihi = (new Date()).toISOString().substring(0, 10);
        this.kayitIcerik.servis_saati = (new Date()).toISOString().substring(11, 16);
        this.modelToForm();
      }
      console.log('Id: ' + this.kayitId.toString());
      });
    this.personelListesiOku();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  servisOku() {
    this.sub2 = this.webApi.getServisListesi(null, this.kayitId).subscribe({
      next: (data: Servis[]) => {
        this.kayitIcerik = data[0];
        this.kayitIcerik.servis_saati = this.kayitIcerik.baslangic_tarihi.substring(11, 16);
        this.kayitIcerik.baslangic_tarihi = this.kayitIcerik.baslangic_tarihi.substring(0, 10);
        this.modelToForm();
      },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  personelListesiOku() {
    this.sub1 = this.webApi.getPersonelListesi().subscribe({
      next: (data: Personel[]) => { this.personelListesi = data; },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  dateToStr(): string {
    // 2012-04-23T18:25:43.511Z // ISO Date-time Formatı
    let tarihStr = this.fgKayit.controls.baslangic_tarihi.value?.substring(0, 10);
    tarihStr += 'T' + this.fgKayit.controls.servis_saati.value?.substring(0, 5);
    return tarihStr || '';
  }


  modelToForm() {
    this.fgKayit.controls.id.setValue(this.kayitIcerik.id.toString());
    this.fgKayit.controls.servis_tanim.setValue(this.kayitIcerik.servis_tanim);
    this.fgKayit.controls.servis_aciklama.setValue(this.kayitIcerik.servis_aciklama);
    this.fgKayit.controls.yapilan_islem.setValue(this.kayitIcerik.yapilan_islem);
    this.fgKayit.controls.baslangic_tarihi.setValue(this.kayitIcerik.baslangic_tarihi);
    this.fgKayit.controls.servis_saati.setValue(this.kayitIcerik.servis_saati);
    this.fgKayit.controls.teslim_tarihi.setValue(this.kayitIcerik.teslim_tarihi!.toString().substring(0, 10));
    this.fgKayit.controls.personel_id.setValue(this.kayitIcerik.personel_id);
    this.fgKayit.controls.ariza_durum.setValue(this.kayitIcerik.ariza_durum);

  }

  formToModel() {
    this.kayitIcerik.id = Number(this.fgKayit.controls.id.value);
    this.kayitIcerik.servis_tanim = this.fgKayit.controls.servis_tanim.value ?? '';
    this.kayitIcerik.yapilan_islem = this.fgKayit.controls.yapilan_islem.value ?? '';
    this.kayitIcerik.baslangic_tarihi = this.dateToStr();
    this.kayitIcerik.teslim_tarihi = this.dateToStr();
    
    this.kayitIcerik.servis_aciklama = this.fgKayit.controls.servis_aciklama.value ?? '';
    this.kayitIcerik.personel_id = Number(this.fgKayit.controls.personel_id.value);
    this.kayitIcerik.ariza_durum = Number(this.fgKayit.controls.ariza_durum.value);

  }

  kaydet() {
    this.formToModel();
    this.webApi.postServis(this.kayitIcerik).subscribe({
      next: (data: Servis) => {
        this.router.navigate(['/servis-kayit', data.id]);
      },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.error; }
    });
  }

}
