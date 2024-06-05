// product-modal.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/http/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    });

    // Set initial form values from the data passed
    this.productForm.patchValue(this.data.product);
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

  onUpdate(): void {
    if (this.productForm.valid) {
      const productId = this.data.product.id;
      const formValue = this.productForm.value;
  
      const updatedProductData = {
        title: formValue.title,
        price: formValue.price,
        description: formValue.description,
        categoryId: formValue.categoryId, // Utilizar el arreglo de imágenes convertido
      };
      const token = localStorage.getItem("token")
      if(token){
        this.productService.updateProduct(productId, updatedProductData)
        .subscribe({
          next: (response) => {
            this.dialogRef.close(response); // Cerrar diálogo con los datos actualizados del producto
            window.location.reload();
            this.openSnackBar('Producto actualizado exitosamente', 'Cerrar');
          },
          error: (error) => {
            console.error('Error al actualizar producto:', error);
            this.openSnackBar('Error al actualizar el producto', 'Cerrar');
          }
        });
      }else{
        this.openSnackBar('Error al actualizar el producto', 'Cerrar');
      }
      
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, // Duration of the notification in milliseconds
      verticalPosition: 'top' // Position the snackbar at the top
    });
  }
}
