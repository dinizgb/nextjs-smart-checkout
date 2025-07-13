import type { UserType, CartState, OrderDetails } from "@/types"
import { products } from "@/resources"

export function calculateOrderDetails(cart: CartState, userType: UserType): OrderDetails {
  const cartItems = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId)
      return {
        productId,
        quantity,
        price: product?.price || 0,
        totalPrice: (product?.price || 0) * quantity,
      }
    })

  if (cartItems.length === 0) {
    return {
      order_total: 0,
      discount_total: 0,
      discount_items: 0,
      discount_message: 1,
    }
  }

  const originalTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (userType === "common") {
    const freeItems = Math.floor(totalItems / 3)

    if (freeItems > 0) {
      const allItems: { price: number }[] = []
      cartItems.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          allItems.push({ price: item.price })
        }
      })
      allItems.sort((a, b) => a.price - b.price)

      const discountTotal = allItems.slice(0, freeItems).reduce((sum, item) => sum + item.price, 0)

      return {
        order_total: originalTotal - discountTotal,
        discount_total: discountTotal,
        discount_items: freeItems,
        discount_message: 1,
      }
    }
  } else if (userType === "vip") {
    const vipDiscount = originalTotal * 0.15

    const freeItems = Math.floor(totalItems / 3)
    let threeForTwoDiscount = 0

    if (freeItems > 0) {
      const allItems: { price: number }[] = []
      cartItems.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          allItems.push({ price: item.price })
        }
      })
      allItems.sort((a, b) => a.price - b.price)

      threeForTwoDiscount = allItems.slice(0, freeItems).reduce((sum, item) => sum + item.price, 0)
    }

    if (threeForTwoDiscount > vipDiscount && freeItems > 0) {
      return {
        order_total: originalTotal - threeForTwoDiscount,
        discount_total: threeForTwoDiscount,
        discount_items: freeItems,
        discount_message: 3,
      }
    } else if (vipDiscount > 0) {
      return {
        order_total: originalTotal - vipDiscount,
        discount_total: vipDiscount,
        discount_items: 0,
        discount_message: 2,
      }
    }
  }

  return {
    order_total: originalTotal,
    discount_total: 0,
    discount_items: 0,
    discount_message: 1,
  }
}
