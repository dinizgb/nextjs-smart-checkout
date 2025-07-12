import type { CartState, CartAction } from "@/types"

export const initialCartState: CartState = {}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "UPDATE_QUANTITY":
      const { productId, quantity } = action.payload
      if (quantity === 0) {
        const newState = { ...state }
        delete newState[productId]
        return newState
      }
      return {
        ...state,
        [productId]: quantity,
      }
    case "RESET_CART":
      return initialCartState
    default:
      return state
  }
}
