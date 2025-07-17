import { Card, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="bg-white/80 backdrop-blur-sm border-2 border-orange-100 rounded-2xl overflow-hidden"
        >
          <div className="w-full h-48 bg-gray-200 animate-pulse" />
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
            </div>
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
