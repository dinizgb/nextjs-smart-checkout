import { render, screen, fireEvent } from "@testing-library/react"
import { ProductsTable } from "@/components/index"
import { products } from "@/resources/products"
import type { CartState } from "@/types/cart"
import { jest } from "@jest/globals"

const mockOnQuantityChange = jest.fn()

describe("ProductsTable", () => {
  beforeEach(() => {
    mockOnQuantityChange.mockClear()
  })

  it("renders products table with correct headers", () => {
    const cart: CartState = {}

    render(<ProductsTable products={products} cart={cart} onQuantityChange={mockOnQuantityChange} />)

    expect(screen.getByText("Our products")).toBeInTheDocument()
    expect(screen.getByText("Products")).toBeInTheDocument()
    expect(screen.getByText("Quantity")).toBeInTheDocument()
  })

  it("renders all products with prices", () => {
    const cart: CartState = {}

    render(<ProductsTable products={products} cart={cart} onQuantityChange={mockOnQuantityChange} />)

    expect(screen.getByText("T-Shirt")).toBeInTheDocument()
    expect(screen.getByText("$35.99")).toBeInTheDocument()

    expect(screen.getByText("Jeans")).toBeInTheDocument()
    expect(screen.getByText("$65.50")).toBeInTheDocument()

    expect(screen.getByText("Dress")).toBeInTheDocument()
    expect(screen.getByText("$80.75")).toBeInTheDocument()
  })

  it("displays correct quantity values from cart", () => {
    const cart: CartState = {
      [products[0].id]: 2,
      [products[1].id]: 0,
      [products[2].id]: 3,
    }

    render(<ProductsTable products={products} cart={cart} onQuantityChange={mockOnQuantityChange} />)

    const selects = screen.getAllByRole("combobox")
    expect(selects).toHaveLength(3)
  })

  it("calls onQuantityChange when quantity is updated", () => {
    const cart: CartState = {}

    render(<ProductsTable products={products} cart={cart} onQuantityChange={mockOnQuantityChange} />)

    const firstSelect = screen.getAllByRole("combobox")[0]
    fireEvent.click(firstSelect)

    const option2 = screen.getByText("2")
    fireEvent.click(option2)

    expect(mockOnQuantityChange).toHaveBeenCalledWith(products[0].id, 2)
  })
})
