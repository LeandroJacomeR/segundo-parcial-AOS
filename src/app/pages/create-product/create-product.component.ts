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
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      categoryId: [1, Validators.required],
      images: ['', Validators.required]
    });
  }

  get title() {
    return this.productForm.get('title') as FormControl;
  }

  get price() {
    return this.productForm.get('price') as FormControl;
  }

  get description() {
    return this.productForm.get('description') as FormControl;
  }

  get categoryId() {
    return this.productForm.get('categoryId') as FormControl;
  }

  get images() {
    return this.productForm.get('images') as FormControl;
  }

  onSubmit() {
    this.creationError = null; // Reset error message
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productData = {
        title: formValue.title,
        price: formValue.price,
        description: formValue.description,
        categoryId: formValue.categoryId,
        images: [formValue.images]
      };

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
