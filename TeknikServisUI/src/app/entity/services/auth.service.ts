import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Personel } from '../models/personel';
import { ServisApiService } from './servis-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private webApi: ServisApiService,
  ) { }

  login(username: string = '', password: string = '') {
    var personel1 = new Personel();
    if (!isNaN(Number(username))) personel1.id = Number(username);
    personel1.personel_sifre = password;
    personel1.personel_eposta = username;
    personel1.personel_adi = username;
    return this.http.post<Personel>('http://localhost:7125/personel/', personel1);
  }

}
