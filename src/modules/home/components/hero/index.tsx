"use client"

import { Button } from "@medusajs/ui"
import { useTranslation } from "@lib/context/translation-context"
import Image from "next/image"

const Hero = () => {
  const { translate } = useTranslation()

  return (
    <div className="relative h-[90vh] w-full bg-nxl-black overflow-hidden">
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-nxl-black/90 to-nxl-black/50 z-10"></div>
      
      {/* Background gradient instead of image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-nxl-black via-nxl-green to-nxl-navy opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-nxl-gold tracking-wide uppercase mb-6">
            Next <span className="text-nxl-ivory">X</span> Level
          </h1>
          
          <h2 className="font-serif text-2xl md:text-3xl text-nxl-ivory mb-8 max-w-xl">
            Premium Canadian Golf Apparel
          </h2>
          
          <p className="font-body text-lg md:text-xl text-nxl-ivory/80 mb-10 max-w-xl leading-relaxed">
            Elevate your golf game with modern, high-performance apparel designed in Canada. Our clothing merges style, comfort, and function—perfect for golfers of all levels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-nxl-gold hover:bg-nxl-gold/80 text-nxl-black font-button py-3 px-8 tracking-wider uppercase text-base"
              size="large"
            >
              Shop Collection
            </Button>
            <Button 
              variant="secondary"
              className="border-nxl-gold text-nxl-gold hover:bg-nxl-gold/10 font-button py-3 px-8 tracking-wider uppercase text-base"
              size="large"
            >
              Our Story
            </Button>
          </div>
          
          {/* Tagline at bottom */}
          <div className="absolute bottom-16 md:bottom-24 left-6 lg:left-8 right-6 lg:right-8">
            <p className="font-button text-nxl-gold text-xl md:text-2xl italic">
              "Take your game—and your style—to the Next Level."
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-t from-nxl-green/20 to-transparent z-0"></div>
    </div>
  )
}

export default Hero
