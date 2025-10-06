"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

interface Template {
  id: number
  title: string
  description: string
  image: string
  author: string
  link: string
}

const templates: Template[] = [
  {
    id: 1,
    title: "Next.js Boilerplate",
    description:
      "Get started with Next.js and React in seconds. A modern starter template with TypeScript and Tailwind CSS.",
    image: "/nextjs-boilerplate-template.jpg",
    author: "Vercel",
    link: "#",
  },
  {
    id: 2,
    title: "Image Gallery Starter",
    description:
      "An image gallery built on Next.js and Cloudinary. Perfect for showcasing your photography or portfolio.",
    image: "/image-gallery-grid-template.jpg",
    author: "Vercel",
    link: "#",
  },
  {
    id: 3,
    title: "AI Chatbot Template",
    description:
      "A full-featured, hackable Next.js AI chatbot built with the Vercel AI SDK. Includes streaming responses.",
    image: "/ai-chatbot-interface-template.jpg",
    author: "Vercel",
    link: "#",
  },
  {
    id: 4,
    title: "Admin Dashboard",
    description:
      "Tailwind CSS, Postgres, and Auth set up. A complete admin dashboard with authentication and database.",
    image: "/modern-admin-dashboard.png",
    author: "Vercel",
    link: "#",
  },
  {
    id: 5,
    title: "E-commerce Store",
    description: "A modern e-commerce storefront with product listings, cart functionality, and checkout integration.",
    image: "/ecommerce-store-template.jpg",
    author: "Vercel",
    link: "#",
  },
  {
    id: 6,
    title: "Documentation Site",
    description:
      "Simple, powerful and flexible markdown-powered docs site. Built with Next.js for optimal performance.",
    image: "/documentation-site-template.jpg",
    author: "Vercel",
    link: "#",
  },
]

export function TemplateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 2
  const maxIndex = Math.max(0, templates.length - itemsPerView)

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 24) / itemsPerView}px)` }}
            >
              <Card className="bg-card border-border overflow-hidden h-full hover:border-muted-foreground/30 transition-colors group">
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 text-balance">{template.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-pretty">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">by {template.author}</span>
                    <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground/80" asChild>
                      <a href={template.link} className="flex items-center gap-1">
                        View Template
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        aria-label="Previous templates"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        aria-label="Next templates"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-foreground w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
