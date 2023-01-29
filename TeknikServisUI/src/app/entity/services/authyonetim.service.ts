import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personel } from '../models/personel';
import { PersonelApiService } from './personel-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthyonetimService {

  constructor(
    private http: HttpClient,
    private webApi: PersonelApiService,
  ) { }

  login(username: string = '', password: string = '') {
    var personel2 = new Personel();
    if (!isNaN(Number(username))) personel2.id = Number(username);
    personel2.personel_sifre = password;
    personel2.personel_eposta = username;
    personel2.personel_adi = username;
    return this.http.post<Personel>('http://localhost:7125/personel/yonetim', personel2);
  }

}
