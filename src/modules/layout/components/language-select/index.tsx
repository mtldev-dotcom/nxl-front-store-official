"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { i18nConfig, Locale } from "@lib/i18n/config"
import { useDictionary } from "@lib/i18n/use-dictionary"

const LanguageSelect = () => {
  const { countryCode, locale } = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const dictionary = useDictionary()
  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-x-2 text-sm text-nxl-ivory hover:text-nxl-gold transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
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
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-nxl-black shadow-md border border-nxl-gold/30 rounded-md z-50">
          <div className="py-2">
            {i18nConfig.locales.map((localeOption) => (
              <button
                key={localeOption}
                className={`w-full px-4 py-2 text-left text-sm text-nxl-ivory hover:bg-nxl-navy hover:text-nxl-gold transition-colors duration-200 ${
                  localeOption === locale ? "font-medium text-nxl-gold" : ""
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
  )
}

export default LanguageSelect
