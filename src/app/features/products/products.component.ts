import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductsService } from './services/products.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule, MatCheckboxModule, ReactiveFormsModule, MatSliderModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {


  products: any[] = []
  categories: any[] = []
  constructor(private productsService: ProductsService) {

  }
  public ngOnInit(): void {
    const products$ = this.productsService.fetchAllProducts();
    const categories$ = this.productsService.fetchAllCategories();
    forkJoin([products$, categories$]).subscribe(([products, categories]) => {
      this.products = products;
      categories.forEach(category => {
        category.isChecked = true;
        (category.subcategories as any[]).forEach(subcategory => {
          subcategory.isChecked = true;
        })
      })
      this.categories = categories;

    })
  }

  public handleParentChecked(selectedCategory: any, isChecked: boolean): void {
    const category = this.categories.find(o => o.id === selectedCategory.id);
    if (category) {
      category.isChecked = isChecked;
      (category.subcategories as any[]).forEach(o => o.isChecked = isChecked);
    }
  }

}

