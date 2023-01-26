import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personel } from '../entity/models/personel';
import { PersonelApiService } from '../entity/services/personel-api.service';


@Component({
  selector: 'app-yonetim-panel',
  templateUrl: './yonetim-panel.component.html',
  styleUrls: ['./yonetim-panel.component.css']
})
export class YonetimPanelComponent implements OnInit {

  personelListesi: Personel[] = [];
  hataMesaji: string = '';
  private sub1: any;
  
  constructor(
    private webApi: PersonelApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personelListesi
  }

  personelListesiOku() {
    this.sub1 = this.webApi.getPersonelListesi().subscribe({
      next: (data: Personel[]) => { this.personelListesi = data; },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  personelDegistir(item: Personel) {
    this.router.navigate(['/personel-kayit', item.id]);
  }

  personelSil(item: Personel) {
    this.webApi.deletePersonel(item.id).subscribe({
      next: () => { this.personelListesiOku(); },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

}
