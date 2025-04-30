"use client"

import { useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { clx } from "@medusajs/ui"
import { ArrowRightMini } from "@medusajs/icons"
import CountrySelect from "../country-select"
import { useToggleState } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { i18nConfig, Locale } from "@lib/i18n/config"

const FooterSelectors = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const { countryCode, locale } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const toggleState = useToggleState()
  const [isLangOpen, setIsLangOpen] = useState(false)

  // Get language display names in the current locale
  const getLanguageName = (localeCode: string): string => {
    switch (localeCode) {
      case "en":
        return locale === "fr" ? "Anglais" : "English"
      case "fr":
        return locale === "fr" ? "Français" : "French"
      default:
        return localeCode.toUpperCase()
    }
  }

  // Handle language change
  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    // Replace current locale in pathname with new locale
    const pathSegments = pathname.split("/")
    
    // The locale is always the third segment ([0] is empty, [1] is countryCode, [2] is locale)
    pathSegments[2] = newLocale
    
    // Build new path and navigate
    const newPath = pathSegments.join("/")
    router.push(newPath)
    setIsLangOpen(false)
  }

  // Use locale-specific labels
  const languageLabel = locale === "fr" ? "Langue" : "Language"
  const countryLabel = locale === "fr" ? "Pays" : "Country"

  return (
    <div className="flex flex-col gap-y-5 text-ui-fg-subtle txt-small">
      <div className="flex flex-col gap-3">
        <span className="txt-small-plus txt-ui-fg-base">
          {languageLabel}
        </span>
        <div className="relative">
          <button
            className="flex items-center gap-x-2"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <span>{getLanguageName(locale as string)}</span>
            <span className="h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform ${
                  isLangOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          {isLangOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white shadow-md border rounded-md z-50">
              <div className="py-1">
                {i18nConfig.locales.map((localeOption) => (
                  <button
                    key={localeOption}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      localeOption === locale ? "font-medium" : ""
                    }`}
                    onClick={() => handleLanguageChange(localeOption)}
                  >
                    {getLanguageName(localeOption)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="txt-small-plus txt-ui-fg-base">
          {countryLabel}
        </span>
        <div 
          className="flex items-center gap-x-2"
          onMouseEnter={toggleState.open}
          onMouseLeave={toggleState.close}
        >
          {regions && (
            <CountrySelect
              toggleState={toggleState}
              regions={regions}
            />
          )}
          <ArrowRightMini
            className={clx(
              "transition-transform duration-150",
              toggleState.state ? "-rotate-90" : ""
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default FooterSelectors
