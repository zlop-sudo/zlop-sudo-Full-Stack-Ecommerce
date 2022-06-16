import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_AUTH,
  OktaAuthGuard
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';

import { OktaAuth } from '@okta/okta-auth-js';
import { MembersPageComponent } from './components/members-page/members-page.component';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  // search
  {path: 'search/:keyword', component: ProductListComponent}, // one search

  // product detail
  {path: 'products/:id', component: ProductDetailsComponent}, // one product

  // menu
  {path: 'category/:id', component: ProductListComponent}, // one category
  {path: 'category', component: ProductListComponent}, // not used

  // cart items
  {path: 'cart-details', component: CartDetailsComponent}, // cart items

  // check out form
  {path: 'checkout', component: CheckoutComponent}, // check out form

  // log in/out
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  // member
  {path: 'members', component: MembersPageComponent, canActivate: [ OktaAuthGuard ]},

  // default
  {path: 'products', component: ProductListComponent}, // defualt 
  {path: '', redirectTo: '/products', pathMatch: 'full'}, // default
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // not used
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
