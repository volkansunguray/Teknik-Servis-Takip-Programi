import { HttpClient, HttpParams } from '@angular/common/http';
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

  getPersonelListesi(personelId: number){
    let params = new HttpParams();
    if (personelId) params = params.append('id', personelId.toString());
    return this.http.get<Personel[]>('http://localhost:7125/personel/', {params})
  }

  deletePersonel(id: number){
    return this.http.delete(this.apiurl + '/personel/' + id);
  }

  postPersonel(personel: Personel){
    if (personel.id > 0){
      return this.http.put<Personel>(this.apiurl + '/personel/' + personel.id.toString(), personel, {});
    }
    else
    { 
      return this.http.post<Personel>(this.apiurl + '/personel/kayit', personel, {});
    }
  }
}
