/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react"
import { useSearchParams } from "next/navigation"
import Home from "@/app/page"

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}))

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>

describe("User Flow Integration Tests", () => {
  beforeEach(() => {
    mockUseSearchParams.mockClear()
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    } as any)
  })

  it("shows full app for common user", () => {
    render(<Home />)

    expect(screen.getByText("The discounts you were waiting for! Time to dress up!")).toBeInTheDocument()
    expect(
      screen.getByText("For every 3 items in the cart, you receive the lowest-priced item from that group for free!"),
    ).toBeInTheDocument()
    expect(screen.queryByText("You're a VIP!")).not.toBeInTheDocument()
    expect(screen.getByText("Our products")).toBeInTheDocument()
    expect(screen.getByText("Order total")).toBeInTheDocument()
  })

  it("shows full app for VIP user with VIP message", () => {
    mockUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue("vip"),
    } as any)

    render(<Home />)

    expect(screen.getByText("The discounts you were waiting for! Time to dress up!")).toBeInTheDocument()
    expect(
      screen.getByText("For every 3 items in the cart, you receive the lowest-priced item from that group for free!"),
    ).toBeInTheDocument()
    expect(screen.getByText("You're a VIP! VIP customers enjoy a 15% discount on all purchases.")).toBeInTheDocument()
    expect(screen.getByText("Our products")).toBeInTheDocument()
  })
})
