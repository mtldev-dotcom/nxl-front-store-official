import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { getDictionary } from "@lib/i18n/get-dictionary"
import { Locale } from "@lib/i18n/config"
import { Text, clx } from "@medusajs/ui"
import { StoreRegion } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import FooterSelectors from "@modules/layout/components/footer-selectors"

interface FooterProps {
  params: {
    locale: Locale
  }
}

export default async function Footer({ params }: FooterProps) {
  const dictionary = await getDictionary(params.locale)
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <footer className="border-t border-nxl-gold/30 w-full bg-nxl-black text-nxl-ivory">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-20">
          <div className="flex flex-col gap-4">
            <LocalizedClientLink
              href="/"
              className="font-display text-2xl tracking-wider text-nxl-gold hover:text-nxl-gold/80 uppercase"
            >
              Next <span className="text-nxl-gold">X</span> Level
            </LocalizedClientLink>
            <p className="font-body text-nxl-ivory/80 max-w-xs">
              Premium Canadian Golf Apparel designed for golfers of every level—from casual weekend players to seasoned professionals.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-nxl-gold hover:text-nxl-gold/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-nxl-gold hover:text-nxl-gold/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-nxl-gold hover:text-nxl-gold/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-3">
              <span className="font-serif text-base text-nxl-gold">Navigation</span>
              <ul className="grid grid-cols-1 gap-y-2 text-nxl-ivory font-body">
                <li>
                  <LocalizedClientLink
                    href="/"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Home
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Store
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/blog"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Blog
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-serif text-base text-nxl-gold">About Us</span>
              <ul className="grid grid-cols-1 gap-y-2 text-nxl-ivory font-body">
                <li>
                  <a
                    href="/about"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="/about#values"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Our Values
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-nxl-gold transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <FooterSelectors regions={regions} />
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-nxl-ivory/60 font-body">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Next X Level. All rights reserved. Proudly made in Canada.
          </Text>
          <div className="flex gap-4 text-sm">
            <a href="/privacy" className="hover:text-nxl-gold transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-nxl-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
