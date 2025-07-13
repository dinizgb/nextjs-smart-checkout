import { cartReducer, initialCartState } from "@/reducers"
import type { CartState } from "@/types/cart"

describe("cartReducer", () => {
  it("should return initial state", () => {
    expect(initialCartState).toEqual({})
  })

  it("should handle UPDATE_QUANTITY action", () => {
    const action = {
      type: "UPDATE_QUANTITY" as const,
      payload: {
        productId: "product-1",
        quantity: 3,
      },
    }

    const newState = cartReducer(initialCartState, action)

    expect(newState).toEqual({
      "product-1": 3,
    })
  })

  it("should handle updating existing product quantity", () => {
    const currentState: CartState = {
      "product-1": 2,
      "product-2": 1,
    }

    const action = {
      type: "UPDATE_QUANTITY" as const,
      payload: {
        productId: "product-1",
        quantity: 5,
      },
    }

    const newState = cartReducer(currentState, action)

    expect(newState).toEqual({
      "product-1": 5,
      "product-2": 1,
    })
  })

  it("should handle setting quantity to 0", () => {
    const currentState: CartState = {
      "product-1": 2,
      "product-2": 1,
    }

    const action = {
      type: "UPDATE_QUANTITY" as const,
      payload: {
        productId: "product-1",
        quantity: 0,
      },
    }

    const newState = cartReducer(currentState, action)

    expect(newState).toEqual({
      "product-2": 1,
    })
  })

  it("should handle RESET_CART action", () => {
    const currentState: CartState = {
      "product-1": 3,
      "product-2": 2,
      "product-3": 1,
    }

    const action = {
      type: "RESET_CART" as const,
      payload: {
        productId: "",
        quantity: 0
      }
    }

    const newState = cartReducer(currentState, action)

    expect(newState).toEqual({})
  })
})
