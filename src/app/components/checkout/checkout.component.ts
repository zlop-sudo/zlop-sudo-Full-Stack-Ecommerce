import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  shipping: number = 0;
  totalQuantity: number = 0;

  countries: Country[] = [];

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuider: FormBuilder, 
              private formService: FormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuider.group(
      {
        customer: this.formBuider.group({
          firstName: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]+')]),
          lastName: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z]+')]),
          email: new FormControl('', 
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
        shippingAddress: this.formBuider.group({
          street: new FormControl('', 
                [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
          city: new FormControl('', 
                [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
          state: new FormControl('', 
                [Validators.required]),
          country: new FormControl('', 
                [Validators.required]),
          zipCode: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]+')])
        }),
        billingAddress: this.formBuider.group({
          street: new FormControl('', 
                [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
          city: new FormControl('', 
                [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
          state: new FormControl('', 
                [Validators.required]),
          country: new FormControl('', 
                [Validators.required]),
          zipCode: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]+')])
        }),
        creditCard: this.formBuider.group({
          cardType: new FormControl('', 
                [Validators.required]),
          nameOnCard: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z\\s]+')]),
          cardNumber: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('', 
                [Validators.required, Validators.minLength(2), Validators.pattern('[0-9]{3}')]),
          expirationMonth: [''],
          expirationYear: ['']
        })
      }
    );

    // populate countries
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

    // populate the credit card expiration years and months
    const startMonth: number = new Date().getMonth() + 1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    // subscribe totals
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    this.cartService.shipping.subscribe(
      data => {
        this.shipping = data;
      }
    );
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get("customer")!.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    // post shipping cost to backend will be done later
    let order: Order = new Order();
    order.totalPrice = this.totalPrice + this.shipping;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems  = this.cartService.cartItems;

    // create oderItems from cartItems
    // - long way
    // let orderItems: OrderItem[] = [];
    // for (let i=0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }
    // - short way
    let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    purchase.shippingAddress.state = shippingState.name;
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    purchase.billingAddress.state = billingState.name;
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    // completion page will be done later
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        // success
        next: reponse => {
          alert(`Your order has been received.\n Order tracking number: ${reponse.orderTrackingNumber}`);

          // reset cart
          this.resetCart();
        },
        // exception
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  resetCart() {
    // reset cart Data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.shipping.next(0);

    // reset the form
    this.checkoutFormGroup.reset();
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardName() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      // [] access and get are same here
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // to set the states array of billing address so that the front end can display(value already set)
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  handleMonths() {
    
    const creditCardFormGroup= this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getMonth();
    const selectedYear: number = creditCardFormGroup.value.expirationYear;

    let startMonth: number = 1;

    if (selectedYear == currentYear) {
      startMonth = new Date().getMonth() + 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  getStates(forGroupName: string) {
    
    const formGroup = this.checkoutFormGroup.get(forGroupName);

    const countryCode = formGroup.value.country.code;

    this.formService.getStates(countryCode).subscribe(
      data => {
        if (forGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}
