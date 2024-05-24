import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _http = inject(HttpClient);

  constructor() { }

  getToken(email: string, password: string){
    return this._http.post(`${environment.api}/auth/login`, {
      email: email,
      password: password
    })
  }
}
