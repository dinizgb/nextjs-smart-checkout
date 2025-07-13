import { Alert, AlertDescription } from "@/components/ui/alert"
import { discountAlerts } from "@/resources"

interface DiscountAlertProps {
  discountMessage: 1 | 2 | 3
  discountTotal: number
  discountItems: number
}

export function DiscountAlert({ discountMessage, discountTotal, discountItems }: DiscountAlertProps) {
  const getMessage = () => {
    switch (discountMessage) {
      case 1:
        return discountAlerts.SCENARIO_1.replace("{NUMBER_OF_ITENS_FOR_FREE}", `${discountItems.toString()} ${discountItems > 1 ? 'items' : 'item'}`).replace(
          "{VALUE_OF_SAVINGS}",
          `$${discountTotal.toFixed(2)}`,
        )
      case 2:
        return discountAlerts.SCENARIO_2.replace("{VALUE_OF_SAVINGS}", `$${discountTotal.toFixed(2)}`)
      case 3:
        return discountAlerts.SCENARIO_3.replace("{NUMBER_OF_ITENS_FOR_FREE}", `${discountItems.toString()} ${discountItems > 1 ? 'items' : 'item'}`)
    }
  }

  return (
    <section className="container mx-auto px-4 py-4">
      <Alert className="bg-green-50 border-green-200">
        <AlertDescription className="text-green-800 font-medium text-lg">{getMessage()}</AlertDescription>
      </Alert>
    </section>
  )
}