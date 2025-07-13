import { heroSection } from "@/resources"
import type { UserType } from "@/types"

interface HeroSectionProps {
  userType: UserType
}

export function Hero({ userType }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{heroSection.TITLE}</h2>
        <p className="text-lg md:text-xl mb-4">{heroSection.COMMON_DESCRIPTION}</p>
        {userType === "vip" && (
          <p className="text-lg md:text-xl font-semibold bg-yellow-400 text-purple-800 px-4 py-2 rounded-lg inline-block">
            {heroSection.VIP_DESCRIPTION}
          </p>
        )}
      </div>
    </section>
  )
}
