import { Component } from '@angular/core';
import { prod } from './model/product';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-15-CRUD-Operation';

  allProducts: prod[] = [];
  isFetching: boolean = false;
  editMode: boolean = false;
  currentProdId:string;




  constructor(private http: HttpClient, private productService: ProductService) { }

  productDetailForm = new FormGroup({
    productName: new FormControl(null,),
    productDescription: new FormControl(null),
    productPrice: new FormControl(null)
  })

  ngOnInit() {
    this.fetchProducts()
  }

  onSubmit(products: any) {
    if(!this.editMode) {
      this.productService.createProduct(products);
    } else {
      this.productService.updateProduct(this.currentProdId,products)
    }

    this.productDetailForm.reset();
    this.editMode = false;
   

  }

  fetchProducts() {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((productval) => {
      this.allProducts = productval;
      this.isFetching = false;
    })
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  clearProduct() {
    this.productService.clearAllProd();
  }

  editProduct(id: string) {
    this.currentProdId = id;
    let currentProd = this.allProducts.find((pVal) => { return pVal.id === id });

    this.productDetailForm.setValue(
      {
        productDescription: currentProd.productDescription,
        productName: currentProd.productName,
        productPrice: currentProd.productPrice,

      }
    )
     this.editMode = true;
     
  }
}
