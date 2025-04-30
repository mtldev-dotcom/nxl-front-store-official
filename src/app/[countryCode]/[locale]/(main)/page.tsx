import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getDictionary } from "@lib/i18n/get-dictionary"
import { Locale } from "@lib/i18n/config"

export async function generateMetadata({ 
  params: paramsPromise 
}: { 
  params: Promise<{ locale: Locale, countryCode: string }> | { locale: Locale, countryCode: string } 
}): Promise<Metadata> {
  // Await params before using
  const params = await paramsPromise
  
  // Get dictionary based on locale
  const dictionary = await getDictionary(params.locale)
  
  return {
    title: dictionary.general.title,
    description: dictionary.general.description,
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string, locale: Locale }> | { countryCode: string, locale: Locale }
}) {
  // Await params before using
  const params = await props.params
  const { countryCode, locale } = params
  
  // Get translations for the page
  const dictionary = await getDictionary(locale)

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        {dictionary.general.featuredProducts}
      </h2>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
