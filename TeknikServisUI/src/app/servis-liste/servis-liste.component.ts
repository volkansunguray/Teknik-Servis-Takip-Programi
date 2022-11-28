import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Servis } from 'src/app/entity/models/servis';
import { ServisApiService } from 'src/app/entity/services/servis-api.service';

@Component({
  selector: 'app-servis-liste',
  templateUrl: './servis-liste.component.html',
  styleUrls: ['./servis-liste.component.css']
})

export class ServisListeComponent implements OnInit {

    inputArama: string = '';
    servisListesi: Servis[] = [];
    sub: any;
    hataMesaji: string = '';
    errorMessage: any;

  constructor(
    private webApi: ServisApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.servisListesiOku();
  }

  servisListesiOku() {
    this.sub = this.webApi.getServisListesi(this.inputArama, 0).subscribe({
      next: (data: Servis[]) => { this.servisListesi = data; },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  servisDegistir(item: Servis) {
    this.router.navigate(['/servis-kayit', item.id]);
  }

  Arama() {
    //this.degisken = 'Hasan Hüseyin';
    this.servisListesiOku();
  }
  hataOlustu(error: any) {
    alert('HATA OLUŞTU: ' + error.error);
  }

  servisSil(item: Servis) {
    this.webApi.deleteServis(item.id).subscribe({
      next: () => { this.servisListesiOku(); },
      error: (error: any) => { this.hataMesaji = 'HATA OLUŞTU: ' + error.message; }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
