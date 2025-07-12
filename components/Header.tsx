import { Logo } from "@/components/index"

export function Header() {
  return (
    <header className="w-full border-b-2 border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-center">
        <Logo />
      </div>
    </header>
  )
}