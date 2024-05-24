import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductoInterface } from '../../interfaces/producto-interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _http = inject(HttpClient)

  constructor() { }

  getAllProducts(): Observable<ProductoInterface[]> {
    return this._http.get<ProductoInterface[]>(`${environment.api}/products`)
  }

  getProduct(id: string): Observable<ProductoInterface> {
    console.log('getProduct', id)
    return this._http.get<ProductoInterface>(`${environment.api}/products/${id}`)
  }

  createProduct(product: Partial<ProductoInterface>): Observable<ProductoInterface> {
    return this._http.post<ProductoInterface>(`${environment.api}/products`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this._http.delete<void>(`${environment.api}/products/${id}`);
  }

  updateProduct(id: string, product: Partial<ProductoInterface>): Observable<ProductoInterface> {
    return this._http.put<ProductoInterface>(`${environment.api}/products/${id}`, product);
  }
}
