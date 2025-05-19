import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;
  categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      id: [data.id],
      name: [data.name || '', [Validators.required]],
      description: [data.description || ''],
      price: [data.price || 0, [Validators.required, Validators.min(0)]],
      quantityInStock: [data.quantityInStock || 0, [Validators.required, Validators.min(0)]],
      category: [data.category || ''],
      imageUrl: [data.imageUrl || '']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const product = this.productForm.value;

    const saveObservable = product.id
      ? this.productService.updateProduct(product.id, product)
      : this.productService.createProduct(product);

    saveObservable.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open(`Product ${product.id ? 'updated' : 'created'} successfully`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error(`Error ${product.id ? 'updating' : 'creating'} product`, error);
        this.snackBar.open(`Failed to ${product.id ? 'update' : 'create'} product`, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}