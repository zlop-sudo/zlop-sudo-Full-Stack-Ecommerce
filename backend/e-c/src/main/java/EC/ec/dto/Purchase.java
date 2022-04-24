package EC.ec.dto;

import EC.ec.entity.Address;
import EC.ec.entity.Customer;
import EC.ec.entity.Order;
import EC.ec.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
