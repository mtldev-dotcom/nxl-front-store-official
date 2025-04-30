import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BrandStory from "@modules/home/components/brand-story"
import CategoriesShowcase from "@modules/home/components/categories-showcase"
import LifestyleBenefits from "@modules/home/components/lifestyle-benefits"
import Newsletter from "@modules/home/components/newsletter"
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
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <div className="py-16 bg-nxl-black">
        <div className="content-container">
          <h2 className="font-display text-3xl md:text-4xl text-nxl-gold uppercase tracking-wider text-center mb-10">
            {dictionary.general.featuredProducts}
          </h2>
          <ul className="flex flex-col gap-y-10">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>
      
      {/* Brand Story Section */}
      <BrandStory />
      
      {/* Categories Showcase */}
      <CategoriesShowcase />
      
      {/* Lifestyle Benefits */}
      <LifestyleBenefits />
      
      {/* Newsletter Signup */}
      <Newsletter />
    </>
  )
}
