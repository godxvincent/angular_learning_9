import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient ) { }


  getPaises(): Observable<any> {
    return this.httpClient.get('https://restcountries.eu/rest/v2/lang/es').pipe( map( (datos: any[]) => {
      return datos.map( dato => {
        return {
          nombre: dato.name,
          codigo: dato.alpha3Code
        };
      });
    }) );
  }
}
