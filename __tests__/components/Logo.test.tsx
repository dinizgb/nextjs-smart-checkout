import { render, screen } from "@testing-library/react"
import { Logo } from "@/components/Logo"

describe("Logo", () => {
  it("renders the logo text", () => {
    render(<Logo />)

    const logo = screen.getByText("Next.js Smart Checkout")
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveClass("text-2xl", "font-bold", "text-gray-800")
  })
})
