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
      nombre: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      detalle: ['', Validators.required],
    });

    // Set initial form values from the data passed
    this.productForm.patchValue(this.data.product);
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


  onUpdate(): void {
    if (this.productForm.valid) {
      const productId = this.data.product.id_producto;
      const formValue = this.productForm.value;
      console.log(formValue);
  
      const updatedProductData = {
        nombre: formValue.nombre,
        valor: formValue.valor,
        detalle: formValue.detalle,
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
