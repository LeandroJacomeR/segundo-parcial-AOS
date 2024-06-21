import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _http = inject(HttpClient);

  constructor() { }

  getToken(username: string, password: string){
    return this._http.get(`${environment.api}auth/login?username=${username}&password=${password}`)
  }
}
