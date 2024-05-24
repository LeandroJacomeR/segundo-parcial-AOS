import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http : HttpClient) { }

  getAllUsers(): Observable<UsuarioInterface[]> {
    return this._http.get<UsuarioInterface[]>(`${environment.api}/users`);
  }

  getUserInfo(): Observable<UsuarioInterface>{
    const token = localStorage.getItem('token');

    // Agregar el token como encabezado de autorización
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Pasar los encabezados en la solicitud
    return this._http.get<UsuarioInterface>(`${environment.api}/auth/profile`, { headers });
  
  }
}
