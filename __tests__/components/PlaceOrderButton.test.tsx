import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { PlaceOrderButton } from "@/components/index"
import type { CartState } from "@/types/cart"
import { jest } from "@jest/globals"

const mockOnResetCart = jest.fn()

describe("PlaceOrderButton", () => {
  beforeEach(() => {
    mockOnResetCart.mockClear()
  })

  it("renders disabled button when no items in cart", () => {
    const cart: CartState = {}

    render(<PlaceOrderButton disabled={true} cart={cart} onResetCart={mockOnResetCart} />)

    const button = screen.getByRole("button", { name: /place my order/i })
    expect(button).toBeDisabled()
  })

  it("renders enabled button when items are in cart", () => {
    const cart: CartState = { "product-1": 2 }

    render(<PlaceOrderButton disabled={false} cart={cart} onResetCart={mockOnResetCart} />)

    const button = screen.getByRole("button", { name: /place my order/i })
    expect(button).not.toBeDisabled()
  })

  it("opens confirmation dialog when button is clicked", () => {
    const cart: CartState = { "product-1": 2 }

    render(<PlaceOrderButton disabled={false} cart={cart} onResetCart={mockOnResetCart} />)

    const button = screen.getByRole("button", { name: /place my order/i })
    fireEvent.click(button)

    expect(screen.getByText("It's everything ok with your order?")).toBeInTheDocument()
    expect(screen.getByText("Let me check again")).toBeInTheDocument()
    expect(screen.getByText("Confirm")).toBeInTheDocument()
  })

  it("resets cart and shows success drawer when confirmed", async () => {
    const cart: CartState = { "product-1": 2 }

    render(<PlaceOrderButton disabled={false} cart={cart} onResetCart={mockOnResetCart} />)

    const button = screen.getByRole("button", { name: /place my order/i })
    fireEvent.click(button)

    const confirmButton = screen.getByText("Confirm")
    fireEvent.click(confirmButton)

    expect(mockOnResetCart).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(screen.getByText("Thanks for buying with us!")).toBeInTheDocument()
    })
  })

  it("closes dialog when cancel is clicked", () => {
    const cart: CartState = { "product-1": 2 }

    render(<PlaceOrderButton disabled={false} cart={cart} onResetCart={mockOnResetCart} />)

    const button = screen.getByRole("button", { name: /place my order/i })
    fireEvent.click(button)

    const cancelButton = screen.getByText("Let me check again")
    fireEvent.click(cancelButton)

    expect(screen.queryByText("It's everything ok with you order?")).not.toBeInTheDocument()

    expect(mockOnResetCart).not.toHaveBeenCalled()
  })
})
