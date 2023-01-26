import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personel } from '../models/personel';

@Injectable({
  providedIn: 'root'
})
export class PersonelApiService {

  constructor(
    private http: HttpClient
  ) { }

  apiurl = "http://localhost:7125";

  getPersonelListesi(){
    return this.http.get<Personel[]>('http://localhost:7125/personel/', {})
  }

  deletePersonel(id: number){
    return this.http.delete(this.apiurl + '/personel/' + id);
  }
}
