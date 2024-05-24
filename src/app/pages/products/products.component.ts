import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/http/products.service';
import { ProductoInterface } from '../../interfaces/producto-interface';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgOptimizedImage, RouterOutlet, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly _productHttp = inject(ProductsService)

  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  product: ProductoInterface[] = []

  ngOnInit() {
    this._route.url.subscribe(url => {
      console.log('Current URL:', this._router.url);
    });
    this._productHttp.getAllProducts().subscribe(
      (res: ProductoInterface[]) => {
        console.log(res)
        this.product = res
      }
    )
  }

}
