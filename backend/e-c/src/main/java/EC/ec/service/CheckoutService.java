package EC.ec.service;

import EC.ec.dto.Purchase;
import EC.ec.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
