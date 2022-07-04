import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

// LIBROS

  postLibro(data : any){
    return this.http.post<any>("http://localhost:3000/listaLibro/", data);
  }
  getLibro(){
    return this.http.get<any>("http://localhost:3000/listaLibro/");
  }
  putLibro(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/listaLibro/"+id, data);
  }
  deletLibro(id:number){
    return this.http.delete<any>("http://localhost:3000/listaLibro/"+id);
  }

  // CATEGORIAS
  postCategoria(dataCat : any){
    return this.http.post<any>("http://localhost:3000/listaCategoria/", dataCat);
  }
  getCategoria(){
    return this.http.get<any>("http://localhost:3000/listaCategoria/");
  }
  putCategoria(dataCat:any,id : number){
    return this.http.put<any>("http://localhost:3000/listaCategoria/"+id, dataCat);
  }
  deletCategoria(id:number){
    return this.http.delete<any>("http://localhost:3000/listaCategoria/"+id);
  }
}
