export interface CartState {
    [productId: string]: number
  }
  
  export interface CartAction {
    type: "UPDATE_QUANTITY" | "RESET_CART"
    payload: {
      productId: string
      quantity: number
    }
  }
  
  export interface OrderDetails {
    order_total: number
    discount_total: number
    discount_items: number
    discount_message: 1 | 2 | 3
  }
  