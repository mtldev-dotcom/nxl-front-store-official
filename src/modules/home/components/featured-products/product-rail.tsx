import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

type ProductRailProps = {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}

export default async function ProductRail({
  collection,
  region,
}: ProductRailProps) {
  const response = await listProducts({
    queryParams: {
      collection_id: [collection.id],
      limit: 4,
    },
  })
  
  const products = response?.response?.products || []

  if (!products) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-nxl-ivory">{collection.title}</h3>
        <LocalizedClientLink
          href={`/collections/${collection.handle}`}
          className="text-sm font-button uppercase text-nxl-gold hover:text-nxl-gold/80 transition-colors duration-200 flex items-center"
        >
          View Collection
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const price = getProductPrice({
            product
          })

          if (!price) {
            return null
          }
          
          return (
            <LocalizedClientLink
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="nxl-card hover:border-nxl-gold/60 transition-all duration-300">
                <div className="relative h-80 mb-4 overflow-hidden">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-button text-nxl-ivory text-lg mb-1 group-hover:text-nxl-gold transition-colors duration-300">
                    {product.title}
                  </h4>
                  <p className="font-body text-nxl-gold text-sm">
                    {convertToLocale({
                      amount: price.cheapestPrice?.calculated_price_number || 0,
                      currency_code: region.currency_code,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {price.cheapestPrice?.calculated_price_number !== price.cheapestPrice?.original_price_number && (
                      <span className="line-through text-nxl-ivory/50 ml-2">
                        {convertToLocale({
                          amount: price.cheapestPrice?.original_price_number || 0,
                          currency_code: region.currency_code,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
