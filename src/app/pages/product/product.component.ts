import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/http/products.service';
import { ProductoInterface } from '../../interfaces/producto-interface';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBarModule
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, RouterOutlet, CommonModule, MatSnackBarModule], // Incluye MatSnackBarModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private readonly _productHttp = inject(ProductsService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar); // Inyecta MatSnackBar
  product: ProductoInterface | null = null;
  errorMessage: string | null = null;

  constructor(
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this._productHttp.getProduct(id).pipe(
            catchError(err => {
              console.error('Error fetching product:', err);
              this.errorMessage = 'Error al obtener el producto, Intente de nuevo más tarde';
              return of(null);
            })
          );
        } else {
          this.errorMessage = 'Invalid product ID.';
          return of(null);
        }
      })
    ).subscribe(
      (res: ProductoInterface | null) => {
        if (res) {
          this.product = res;
        }
      }
    );
  }

  updateProduct() {
    console.log('Actualizar producto');
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '800px',
      data: { product: this.product }
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        // Aquí puedes manejar la actualización del producto
        console.log('Producto actualizado:', updatedProduct);
      }
    });
  }

  deleteProduct() {
    const token = localStorage.getItem("token")
    if(token){
      if (this.product && this.product.id) {
        this._productHttp.deleteProduct(this.product.id.toString()).subscribe({
          next: () => {
            console.log('Producto eliminado');
            this.openSnackBar('Producto eliminado exitosamente', 'Cerrar');
            this.goBack();
          },
          error: (err) => {
            console.error('Error eliminando producto:', err);
            this.openSnackBar('Error al eliminar el producto, Intente de nuevo más tarde', 'Cerrar');
          }
        });
      }
    }else{
      this.openSnackBar('Error al eliminar el producto', 'Cerrar');
    }
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, // Duración de la notificación en milisegundos
      verticalPosition: 'top', // Posición de la notificación en la parte superior
    });
  }

  goBack(): void {
    this.location.back();
  }
}
