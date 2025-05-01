import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { getDictionary } from "@lib/i18n/get-dictionary"
import { Locale } from "@lib/i18n/config"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSelect from "@modules/layout/components/language-select"

interface NavProps {
  params: {
    locale: Locale
  }
}

export default async function Nav({ params }: NavProps) {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-nxl-black border-nxl-gold/30">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full lg:hidden">
              <SideMenu regions={regions} />
            </div>
          {/* Regular navigation for desktop view */}
          <div className="hidden lg:flex items-center space-x-8">
            <LocalizedClientLink 
              href="/"
              className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
            >
              {dictionary.navigation.home}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/store"
              className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
            >
              {dictionary.navigation.shop}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/blog"
              className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
            >
              {dictionary.navigation.about}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/contact"
              className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
            >
              {dictionary.navigation.contact}
            </LocalizedClientLink>
          </div>
          
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl tracking-wider hover:text-nxl-gold text-nxl-gold transition-colors duration-300 uppercase"
              data-testid="nav-store-link"
            >
              Next <span className="text-nxl-gold">X</span> Level
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LanguageSelect />
              <LocalizedClientLink
                className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
                href="/account"
                data-testid="nav-account-link"
              >
                {dictionary.general.account}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="font-body text-nxl-ivory hover:text-nxl-gold transition-colors duration-300 flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {dictionary.general.cart} (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
