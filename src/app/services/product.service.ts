import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { prod } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http: HttpClient) { }


  createProduct(products: any) {
    const headers = new HttpHeaders({ 'myHeader': 'angular15' })
    this.http.post('https://angular15project-default-rtdb.firebaseio.com/product.json', products, { headers: headers })
      .subscribe((response) => {
        console.log("post method value==>", response);
      })
  }

  fetchProduct() {
    return this.http.get<{ [key: string]: prod }>('https://angular15project-default-rtdb.firebaseio.com/product.json')
      .pipe(map((res) => {
        const productsVal = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            productsVal.push({ ...res[key], id: key })
          }
        }
        return productsVal
      }))
  }

  deleteProduct(id:string) {
    this.http.delete('https://angular15project-default-rtdb.firebaseio.com/product/'+id+'.json').subscribe();
  }

  clearAllProd() {
    this.http.delete('https://angular15project-default-rtdb.firebaseio.com/product.json').subscribe();
  }

  updateProduct(id:string, value:prod) {
    this.http.put('https://angular15project-default-rtdb.firebaseio.com/product/'+id+'.json', value).subscribe();
  }
}
