import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/http/products.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent {
  productForm: FormGroup;
  creationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(1)]],
      detalle: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  get nombre() {
    return this.productForm.get('nombre') as FormControl;
  }

  get valor() {
    return this.productForm.get('valor') as FormControl;
  }

  get detalle() {
    return this.productForm.get('detalle') as FormControl;
  }

  get img() {
    return this.productForm.get('img') as FormControl;
  }

  onSubmit() {
    this.creationError = null; // Reset error message
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productData = {
        nombre: formValue.nombre,
        valor: formValue.valor,
        detalle: formValue.detalle,
        img: formValue.img
      };

      console.log(productData);

      const token = localStorage.getItem("token")
      if (token) {
        this.productService.createProduct(productData)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                this.creationError = 'Error al crear el producto: Unauthorized';
              } else if (error.status === 400) {
                this.creationError = 'Error al crear el producto: Bad Request';
              } else {
                this.creationError = 'Error al crear el producto. Inténtalo de nuevo más tarde.';
              }
              return throwError(error);
            })
          )
          .subscribe({
            next: (response) => {
              console.log('Producto creado:', response);
              this.openSnackBar('Producto creado exitosamente', 'Cerrar');
              this.router.navigate(['/productos']);
            },
            error: (error) => {
              console.error('Error al crear producto:', error);
              this.openSnackBar('Error al crear el producto', 'Cerrar');
            }
          });
      } else {
        console.log('Formulario inválido');
        this.openSnackBar('Error al crear el producto', 'Cerrar');
      }
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration of the notification in milliseconds
      verticalPosition: 'top', // Position the snackbar at the top
    });
  }

  goBack(): void {
    this.location.back();
  }
}
