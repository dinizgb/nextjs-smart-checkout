"use client"

import { useSearchParams } from "next/navigation"
import { useReducer, useMemo } from "react"
import { Suspense } from "react"

import { DiscountAlert, Footer, Header, Hero, OrderTotalSection, PlaceOrderButton, ProductsTable } from "@/components/index"

import { cartReducer, initialCartState } from "@/reducers"
import { calculateOrderDetails } from "@/utils"

import { products } from "@/resources"

import type { UserType } from "@/types"

function HomeContent() {
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") as UserType || "common"

  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  const orderDetails = useMemo(() => {
    return calculateOrderDetails(cart, userType as UserType)
  }, [cart, userType])

  const hasItemsInCart = Object.values(cart).some((quantity) => quantity > 0)

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity },
    })
  }

  const handleResetCart = () => {
    dispatch({
      type: "RESET_CART",
      payload: {
        productId: "",
        quantity: 0
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero userType={userType} />
        <ProductsTable products={products} cart={cart} onQuantityChange={handleQuantityChange} />
        <OrderTotalSection orderTotal={orderDetails.order_total} />
        {orderDetails.discount_total > 0 && (
          <DiscountAlert
            discountMessage={orderDetails.discount_message}
            discountTotal={orderDetails.discount_total}
            discountItems={orderDetails.discount_items}
          />
        )}
        <PlaceOrderButton disabled={!hasItemsInCart} cart={cart} onResetCart={handleResetCart} />
      </main>
      <Footer />
    </div>
  )

}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
