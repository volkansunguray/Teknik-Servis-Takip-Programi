import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servis } from '../models/servis';
import { Personel } from '../models/personel';

@Injectable({
  providedIn: 'root'
})
export class ServisApiService {
  delete(arg0: (string | number)[]) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }
  
  
  apiurl = "http://localhost:7125";


  getServisListesi(arama: string | null, servisId: number) {
    let params = new HttpParams();
    if (arama) params = params.append('arama', arama.toString());
    if (servisId) params = params.append('id', servisId.toString());
    return this.http.get<Servis[]>('http://localhost:7125/teknikservis', { params })
  }

  postServis(servis: Servis) {
    if (servis.id > 0){
      return this.http.put<Servis>(this.apiurl + '/teknikservis/' + servis.id.toString(), servis, {});
    }
    else
    { 
      return this.http.post<Servis>(this.apiurl + '/teknikservis/', servis, {});
    }
  }

  deleteServis(id: number){
    return this.http.delete(this.apiurl + '/teknikservis/' + id);
  }

  getPersonelListesi() {
    return this.http.get<Personel[]>('http://localhost:7125/personel/', {})
  }

}
