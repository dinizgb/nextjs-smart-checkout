"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productsTable } from "@/resources"
import type { Product, CartState } from "@/types"

interface ProductsTableProps {
  products: Product[]
  cart: CartState
  onQuantityChange: (productId: string, quantity: number) => void
}

export function ProductsTable({ products, cart, onQuantityChange }: ProductsTableProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{productsTable.TITLE}</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-xl">
                {productsTable.TABLE_HEADER_PRODUCTS}
              </th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-right text-xl">
                {productsTable.TABLE_HEADER_QUANTITY}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">
                  <div>
                    <div className="font-medium text-lg">{product.title}</div>
                    <div className="text-gray-600 text-lg">${product.price.toFixed(2)}</div>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-3">
                    <div className="float-right">
                        <Select
                        value={cart[product.id]?.toString() ?? "0"}
                        onValueChange={(value) => onQuantityChange(product.id, Number.parseInt(value))}
                        >
                            <SelectTrigger className="w-20">
                              {cart[product.id]?.toString() ? <SelectValue /> : "0"}
                            </SelectTrigger>
                            <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                {i}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
