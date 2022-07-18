import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  url='http://localhost/compusoluciones/api/'; 

  constructor(private http: HttpClient) { }

  getEmpresas() {
    return this.http.get(`${this.url}get.php`);
  }

  getTipoEmpresa() {
    return this.http.get(`${this.url}tipo_empresa.php`);
  }

  createEmpresa(empresa:any) {
    return this.http.post(`${this.url}create.php`, JSON.stringify(empresa));
  }

  getEmpresa(id:number) {
    return this.http.get(`${this.url}select.php?id=${id}`);
  }

  updateEmpresa(id:number, empresa:any) {
    return this.http.post(`${this.url}update.php?id=${id}`, JSON.stringify(empresa));
  }

  deleteEmpresa(id:number) {
    return this.http.get(`${this.url}delete.php?id=${id}`);
  }
}
