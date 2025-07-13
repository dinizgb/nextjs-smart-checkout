import { Logo } from "@/components/index"
import { footer } from "@/resources"

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <p className="text-gray-600 text-center md:text-right">{footer.TEXT}</p>
      </div>
    </footer>
  )
}
