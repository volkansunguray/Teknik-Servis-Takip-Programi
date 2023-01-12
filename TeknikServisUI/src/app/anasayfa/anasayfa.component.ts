import { Component, OnInit } from '@angular/core';
import { Personel } from '../entity/models/personel';
import { ServisApiService } from '../entity/services/servis-api.service';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {

  personelListesi: Personel[] = [];
  private sub1: any;

  user: string = localStorage.getItem('loginPersonel') || '';

  constructor(
    private webApi: ServisApiService
  ) {}

  ngOnInit(): void {
  }

  personelListesiOku() {
    this.sub1 = this.webApi.getPersonelListesi().subscribe({
      next: (data: Personel[]) => { this.personelListesi = data; }
    });
  }

}
