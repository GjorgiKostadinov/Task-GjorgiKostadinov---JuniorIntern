import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDetailComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    this.productService.getProduct(this.data.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product details', error);
        this.isLoading = false;
      }
    });
  }

  editProduct(): void {
    this.dialogRef.close();
    if (this.product) {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '500px',
        data: this.product
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadProduct();
        }
      });
    }
  }
}