import { orderTotalSection } from "@/resources"

interface OrderTotalSectionProps {
  orderTotal: number
}

export function OrderTotalSection({ orderTotal }: OrderTotalSectionProps) {
  return (
    <section className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <h3 className="text-xl font-semibold text-gray-800">{orderTotalSection.TITLE}</h3>
        <h4 className="text-xl font-semibold text-gray-800">${orderTotal.toFixed(2)}</h4>
      </div>
    </section>
  )
}