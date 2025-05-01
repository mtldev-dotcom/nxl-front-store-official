import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"
import { getDictionary } from "@lib/i18n/get-dictionary"
import { Locale } from "@lib/i18n/config"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default async function NotFound({ params }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base font-serif">{dictionary.error.pageNotFound}</h1>
      <p className="text-small-regular text-ui-fg-base text-center max-w-md">
        {dictionary.error.pageNotFoundDesc}
      </p>
      <InteractiveLink href="/">{dictionary.error.goToFrontpage}</InteractiveLink>
    </div>
  )
}
