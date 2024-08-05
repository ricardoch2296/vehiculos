import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Vehiculo {
  id: number,
  placa: string,
  entrada: string,
  salida: string,
  recaudo: number
}

export interface Placa {
  placa: string}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private apiUrl = 'http://localhost:5000/vehiculos';

  constructor( private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.apiUrl)
  }

  addVehiculo(placa:Placa): Observable<any>{
    console.log(placa)
    return this.http.post(this.apiUrl, placa);
  }

  checkout(id:number, recaudo:number, salida: Date){
    return this.http.put(this.apiUrl, {id: id, recaudo:recaudo, salida:salida});
  }


}
