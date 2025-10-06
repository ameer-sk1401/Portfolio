"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  techStack: string[]
  icon: string
  github: string
  demo: string
}

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 2

  const maxIndex = Math.max(0, projects.length - itemsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white"
          aria-label="Previous projects"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Projects Container */}
        <div className="flex-1 overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * 16}px / ${itemsPerPage})` }}
              >
                <Card className="bg-black/40 border-white/10 p-6 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 h-full group">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-300 mb-2">{project.title}</h3>
                      <p className="text-white/60 text-sm mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-white/10 rounded text-xs text-white">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-white hover:text-blue-300">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:text-blue-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <Button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white"
          aria-label="Next projects"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-blue-400" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
