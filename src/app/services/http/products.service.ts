import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductoInterface } from '../../interfaces/producto-interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _http = inject(HttpClient);

  constructor() { }

  private headers = () => {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers: headers };
  }

  getAllProducts(): Observable<{ msg: string, data: ProductoInterface[] }> {
    return this._http.get<{ msg: string, data: ProductoInterface[] }>(`${environment.api}api/producto`, this.headers());
  }

  getProduct(id: string): Observable<{ msg: string, data: ProductoInterface }> {
    console.log('getProduct', id);
    return this._http.get<{ msg: string, data: ProductoInterface }>(`${environment.api}api/producto/${id}`, this.headers());
  }

  createProduct(product: Partial<ProductoInterface>): Observable<ProductoInterface> {
    return this._http.post<ProductoInterface>(`${environment.api}api/producto`, product, this.headers());
  }

  deleteProduct(id: string): Observable<{ msg: string }> {
    return this._http.delete<{ msg: string }>(`${environment.api}api/producto/${id}`, this.headers());
  }

  updateProduct(id: string, product: Partial<ProductoInterface>): Observable<ProductoInterface> {
    return this._http.put<ProductoInterface>(`${environment.api}api/producto/${id}`, product, this.headers());
  }
}
