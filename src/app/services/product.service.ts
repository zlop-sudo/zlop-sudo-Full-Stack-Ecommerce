import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  // // for get products of one specific category
  // // not used anymore since pagination
  // getProductList(theCategoryId: number): Observable<Product[]> {

  //   // build url based on category id
  //   const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

  //   return this.getProducts(searchUrl);
  // }

  // for get all categories
  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  // // not used anymore since pagination
  // // for search
  // searchProducts(theKeyword: string): Observable<Product[]> {
  //   // build url based on category id
  //   const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

  //   return this.getProducts(searchUrl);
  // }
  
  // // not used anymore since pagination
  // // encapsulation
  // private getProducts(searchUrl: string): Observable<Product[]> {
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     map(response => response._embedded.products)
  //   );
  // }

  // for porduct detail
  getProduct(theProductId: number): Observable<Product> {
    // build url
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // for get products of one specific category of one page
  getProductListPagination(thePage: number,
                          thePageSize: number, 
                          theCategoryId: number): Observable<GetResponseProducts> {

    // build url based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProductsPagination(thePage: number,
                          thePageSize: number, 
                          theKeyword: string): Observable<GetResponseProducts> {
    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]; 
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
