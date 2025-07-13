import { calculateOrderDetails } from "@/utils/calculateOrderDetails"
import type { CartState } from "@/types/cart"

describe("Discount Scenarios", () => {
  const TSHIRT_ID = "a8cdba59-6c8f-439c-a329-c5a85cb13232"
  const JEANS_ID = "9723e8af-2097-4e39-926e-7466058aa792"
  const DRESS_ID = "f10ae7ea-e09b-43e3-91e0-ec15907a89bb"

  describe("Scenario 1: Common customer adds 3 t-shirts", () => {
    it("should apply Get 3 for 2 promotion correctly", () => {
      const cart: CartState = {
        [TSHIRT_ID]: 3,
      }

      const result = calculateOrderDetails(cart, "common")

      expect(result.order_total).toBeCloseTo(71.98, 2)
      expect(result.discount_total).toBeCloseTo(35.99, 2)
      expect(result.discount_items).toBe(1)
      expect(result.discount_message).toBe(1)
    })
  })

  describe("Scenario 2: Common customer adds 2 t-shirts and 2 jeans", () => {
    it("should give free t-shirt as cheapest item", () => {
      const cart: CartState = {
        [TSHIRT_ID]: 2,
        [JEANS_ID]: 2,
      }

      const result = calculateOrderDetails(cart, "common")

      expect(result.order_total).toBeCloseTo(166.99, 2)
      expect(result.discount_total).toBeCloseTo(35.99, 2) // T-shirt is cheapest
      expect(result.discount_items).toBe(1)
      expect(result.discount_message).toBe(1)
    })
  })

  describe("Scenario 3: VIP customer adds 3 dresses", () => {
    it("should recommend Get 3 for 2 over VIP discount", () => {
      const cart: CartState = {
        [DRESS_ID]: 3,
      }

      const result = calculateOrderDetails(cart, "vip")

      // Should use Get 3 for 2 (161.50) instead of VIP discount (205.91)
      expect(result.order_total).toBeCloseTo(161.5, 2)
      expect(result.discount_total).toBeCloseTo(80.75, 2) // One dress free
      expect(result.discount_items).toBe(1)
      expect(result.discount_message).toBe(3) // Better than VIP discount message
    })
  })

  describe("Scenario 4: VIP customer adds 2 jeans and 2 dresses", () => {
    it("should recommend Get 3 for 2 over VIP discount", () => {
      const cart: CartState = {
        [JEANS_ID]: 2,
        [DRESS_ID]: 2,
      }

      const result = calculateOrderDetails(cart, "vip")

      // Should use Get 3 for 2 (227.00) instead of VIP discount (248.63)
      expect(result.order_total).toBeCloseTo(227.0, 2)
      expect(result.discount_total).toBeCloseTo(65.5, 2) // Jeans is cheaper, so it's free
      expect(result.discount_items).toBe(1)
      expect(result.discount_message).toBe(3) // Better than VIP discount message
    })
  })

  describe("Scenario 5: VIP customer adds 4 t-shirts and 1 jeans", () => {
    it("should recommend Get 3 for 2 over VIP discount", () => {
      const cart: CartState = {
        [TSHIRT_ID]: 4,
        [JEANS_ID]: 1,
      }

      const result = calculateOrderDetails(cart, "vip")

      // Should use Get 3 for 2 (173.47) instead of VIP discount (178.04)
      expect(result.order_total).toBeCloseTo(173.47, 2)
      expect(result.discount_total).toBeCloseTo(35.99, 2) // T-shirt is cheapest, so it's free
      expect(result.discount_items).toBe(1)
      expect(result.discount_message).toBe(3) // Better than VIP discount message
    })
  })

  describe("VIP discount scenarios", () => {
    it("should apply VIP discount when it's better than Get 3 for 2", () => {
      // Single expensive item where 15% discount is better
      const cart: CartState = {
        [DRESS_ID]: 1,
      }

      const result = calculateOrderDetails(cart, "vip")

      const expectedVipDiscount = 80.75 * 0.15
      const expectedTotal = 80.75 - expectedVipDiscount

      expect(result.order_total).toBeCloseTo(expectedTotal, 2)
      expect(result.discount_total).toBeCloseTo(expectedVipDiscount, 2)
      expect(result.discount_items).toBe(0)
      expect(result.discount_message).toBe(2) // VIP discount message
    })
  })

  describe("Edge cases", () => {
    it("should handle empty cart", () => {
      const cart: CartState = {}

      const commonResult = calculateOrderDetails(cart, "common")
      const vipResult = calculateOrderDetails(cart, "vip")

      expect(commonResult.order_total).toBe(0)
      expect(commonResult.discount_total).toBe(0)
      expect(commonResult.discount_items).toBe(0)

      expect(vipResult.order_total).toBe(0)
      expect(vipResult.discount_total).toBe(0)
      expect(vipResult.discount_items).toBe(0)
    })

    it("should handle single item for common user (no discount)", () => {
      const cart: CartState = {
        [TSHIRT_ID]: 1,
      }

      const result = calculateOrderDetails(cart, "common")

      expect(result.order_total).toBeCloseTo(35.99, 2)
      expect(result.discount_total).toBe(0)
      expect(result.discount_items).toBe(0)
    })

    it("should handle two items for common user (no discount)", () => {
      const cart: CartState = {
        [TSHIRT_ID]: 2,
      }

      const result = calculateOrderDetails(cart, "common")

      expect(result.order_total).toBeCloseTo(71.98, 2)
      expect(result.discount_total).toBe(0)
      expect(result.discount_items).toBe(0)
    })
  })
})
