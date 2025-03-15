import { Card, CardContent } from "@/components/ui/card"
import { Recycle } from "lucide-react"

interface PricingCardProps {
  name: string
  minPrice: number
  maxPrice: number
  condition: "working" | "not_working"
}

export function PricingCard({ name, minPrice, maxPrice, condition }: PricingCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-muted flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="relative p-6 flex items-center justify-center">
          <Recycle className="h-16 w-16 text-white" />
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-3xl font-bold text-primary mt-2">
          ₹{minPrice} - ₹{maxPrice}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {condition === "working" ? "Working condition" : "Non-working condition"}
        </p>
      </CardContent>
    </Card>
  )
}

