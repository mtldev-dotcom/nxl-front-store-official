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
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full lg:hidden">
              <SideMenu regions={regions} />
            </div>
          {/* Regular navigation for desktop view */}
          <div className="hidden lg:flex items-center space-x-6">
            <LocalizedClientLink 
              href="/"
              className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            >
              {dictionary.navigation.home}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/categories"
              className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            >
              {dictionary.navigation.categories}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/collections"
              className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            >
              {dictionary.navigation.collections}
            </LocalizedClientLink>
            <LocalizedClientLink 
              href="/store"
              className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
            >
              {dictionary.navigation.shop}
            </LocalizedClientLink>
          </div>
          
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              {dictionary.general.title}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LanguageSelect />
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                {dictionary.general.account}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
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
