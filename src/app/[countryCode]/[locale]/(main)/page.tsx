/*****************************************************************************************
 * Home Page ([countryCode]/[locale]/(main)/page.tsx)
 * ---------------------------------------------------------------------------------------
 * Purpose:
 *   • Render the localized home page for a given country and locale.
 *   • Provide SEO metadata based on locale-specific dictionary.
 *   • Fetch and display content sections: Hero, Featured Products, Brand Story,
 *     Categories Showcase, Lifestyle Benefits, Newsletter.
 *
 * High-level flow:
 *   1. generateMetadata() → Build page <head> tags (title + description) using i18n.
 *   2. default export Home() → Async server component:
 *        a. Await route params (countryCode, locale).
 *        b. Load dictionary for translations.
 *        c. Fetch region data for pricing / localization.
 *        d. Fetch collections for featured products.
 *        e. Guard against missing data (return null if absent).
 *        f. Render page sections in order.
 *****************************************************************************************/

import { Metadata } from "next" // Next.js type for metadata export

// UI components for each page section
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BrandStory from "@modules/home/components/brand-story"
import CategoriesShowcase from "@modules/home/components/categories-showcase"
import LifestyleBenefits from "@modules/home/components/lifestyle-benefits"
import Newsletter from "@modules/home/components/newsletter"

// Data-fetching helpers
import { listCollections } from "@lib/data/collections" // Fetch product collections
import { getRegion } from "@lib/data/regions"           // Fetch region/pricing context

// Internationalization helpers
import { getDictionary } from "@lib/i18n/get-dictionary" // Load locale-specific texts
import { Locale } from "@lib/i18n/config"                // Locale type

/**
 * generateMetadata
 * -----------------------------------------------------------------------------
 * Called by Next.js App Router to generate <head> metadata for the home page.
 * Uses the locale to load the appropriate dictionary for title and description.
 *
 * @param paramsPromise - Promise or object containing locale and countryCode
 * @returns Metadata object with localized title & description
 */
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ locale: Locale; countryCode: string }>
}): Promise<Metadata> {
  // Wait for route params to resolve
  const params = await paramsPromise

  // Load translation dictionary for the given locale
  const dictionary = await getDictionary(params.locale)

  // Return metadata using locale-specific text
  return {
    title: dictionary.general.title,
    description: dictionary.general.description,
  }
}

/**
 * Home Component (default export)
 * -----------------------------------------------------------------------------
 * Async server component that renders the home page.
 *
 * @param props.params  - Promise or object with { countryCode, locale }
 * @returns JSX for the home page layout and sections
 */
export default async function Home(props: {
  params:
    | Promise<{ countryCode: string; locale: Locale }>
    | { countryCode: string; locale: Locale }
}) {

  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  console.log(`🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍`)
  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  
    const now = new Date().toISOString();
    console.log(`[${now}]`);  

  // 1. Await dynamic route params (country and locale)
  const params = await props.params
  const { countryCode, locale } = params
  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  console.log(`🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍`)
  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  console.log("params", params)
  console.log("countryCode", countryCode)
  console.log("locale", locale)
  // 2. Load localized text dictionary
  const dictionary = await getDictionary(locale)
  //console.log("dictionary", dictionary)
  // 3. Fetch region for pricing/localization context
  const region = await getRegion(countryCode)
  console.log("region", region)

  // 4. Fetch collections for featured products section
  //    - listCollections returns `{ collections: Collection[] }` containing all collections.
  //    - We request only minimal fields (`id`, `handle`, `title`) to reduce payload size.
  //    - The FeaturedProducts component expects the 'features' collection handle.
  //      Ensure your backend has a collection with handle "features" (case-sensitive).
  //    - If you want to fetch only that collection directly, enable:
  //        listCollections({ queryParams: { handle: "features" } })
  //      which returns only the matching collection.
  //    - If `collections` is empty or missing "features", no featured products will render.
  // 4. Fetch only the 'features' collection for featured products
  //    • Your backend collection title is "Fearures", but handle must be exactly "features".
  //    • Confirm in Medusa admin that the handle (not title) reads "features" (lowercase).
  //    • Querying by handle avoids including empty or unrelated collections.
  //    • Uncomment `queryParams` below to restrict fetch to that handle.
  const { collections } = await listCollections({
    handle: "features",       // Fetch only the 'features' collection
    fields: "id,handle,title", // Include minimal fields to reduce payload
  })
  console.log("listCollections", listCollections)
  // collections: Array<Collection> – should contain your "features" collection
  console.log("collections", collections)
  console.log("collection handles", collections.map(c => c.handle))
  // 5. Guard: if essential data is missing, render nothing
  //    - If `collections` is empty (length 0), verify:
  //        • The collection name in backend is "Fearures" → handle should be exactly "features" (lowercase).
  //        • The handle spelling matches "features" (case-sensitive).
  //        • The collection is published and assigned to products.
  //    - You can debug by checking:
  //        console.log(collections.map(c => c.handle))
  //    - To target only the 'features' collection, fetch with:
  //        listCollections({ queryParams: { handle: "features" }, fields: "id, handle, title" })
  if (!collections || !region) {
    return null
  }
  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  console.log(`❌❌❌❌❌❌❌❌❌❌`)
  console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  // 6. Render page sections in order
  return (
    <>
      {/* Hero Section: main banner with call-to-action */}
      <Hero dictionary={dictionary} />

      {/* Featured Products Section: highlighted collections */}
      <div className="py-16 bg-nxl-black">
        <div className="content-container">
          <h2 className="font-display text-3xl md:text-4xl text-nxl-gold uppercase tracking-wider text-center mb-10">
            {dictionary.general.featuredProducts}
          </h2>
          <ul className="flex flex-col gap-y-10">
            {/* 
              The FeaturedProducts component expects at least one collection
              with handle "features". If `collections` is empty or missing a
              "features" handle, this list will render nothing.
              Confirm your backend collection handle is spelled exactly "features"
              and published.
            */
            }
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      </div>

      {/* Brand Story Section: company background and values */}
      <BrandStory dictionary={dictionary} />

      {/* Categories Showcase Section: overview of product categories */}
      <CategoriesShowcase dictionary={dictionary} />

      {/* Lifestyle Benefits Section: highlight lifestyle use cases */}
      <LifestyleBenefits dictionary={dictionary} />

      {/* Newsletter Signup Section: email capture form */}
      <Newsletter dictionary={dictionary} />
    </>
  )
}
