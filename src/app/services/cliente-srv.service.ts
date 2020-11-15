import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteDto } from '../models/clienteDto';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteSrvService {

  constructor(private http: HttpClient) { }

  registrarCliente( post : ClienteDto){
    return this.http.post(`https://retailclientes.herokuapp.com/creacliente`,post).pipe(
      map(resp => {
        console.log(resp['responseCode']) 
        if(resp['responseCode']==='0'){
          return resp;
        }else{
          let errorMessage = resp['responseMessage'];
          return throwError(errorMessage);
        }
      }),
      catchError(e => {
        return e;
      })     
    );  
  }


  listarCliente(){
    return this.http.get(`https://retailclientes.herokuapp.com/listclientes`).pipe(
      map(resp => {
        return resp;
      }),
      catchError(e => {
        return e;
      })     
    );  
  }

  getKpideclientes(){
    return this.http.get(`https://retailclientes.herokuapp.com/kpideclientes`).pipe(
      map(resp => {
        return resp;
      }),
      catchError(e => {
        return e;
      })     
    );  
  }
}
