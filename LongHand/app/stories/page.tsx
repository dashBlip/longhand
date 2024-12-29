'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const book = {
  title: "Dusk We Shared",
  coverImage: "https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/cover-photo-8PdMa5z4orGSwVGONoZkqSlGKZJL1g.png",
  chapters: [
    {
      title: "Early Morning",
      description: "Starting the story with a brief introduction of some characters and narrating the past event of how they first met.",
      link: "https://drive.google.com/file/d/1WRXthKmml99L93HkG-AdkL4QX99HmJZu/view"
    },
    {
      title: "Echoes",
      description: "Continuing the expression of feelings from the first sight, the important event, and their first conversation.",
      link: "https://drive.google.com/file/d/1qN3RHqlwcXcS4heFxuf7ayVjhWjujmEJ/view"
    }
  ]
}

export default function Stories() {
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 2;
  const totalPages = Math.ceil(book.chapters.length / chaptersPerPage);

  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = book.chapters.slice(indexOfFirstChapter, indexOfLastChapter);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-3xl font-bold mb-6 text-center title-gradient"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {book.title}
      </motion.h1>
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm mb-8">
        <div className="md:flex">
          <motion.div 
            className="md:w-1/3 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                priority
              />
            </div>
          </motion.div>
          <motion.div 
            className="md:w-2/3 p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-gradient from-primary to-secondary">Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentChapters.map((chapter, index) => (
                  <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold mb-2 text-gradient from-primary/80 to-secondary/80">{chapter.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{chapter.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={chapter.link}>Read Chapter</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        </div>
      </Card>
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          size="sm"
          variant="outline"
          className="border-primary/20 hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <span className="text-sm text-foreground/70">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          size="sm"
          variant="outline"
          className="border-primary/20 hover:bg-primary/10"
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

