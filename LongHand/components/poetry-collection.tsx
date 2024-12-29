'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Poem {
  title: string;
  content: string;
  meaning: string;
}

interface PoetryCollectionProps {
  title: string;
  poems: Poem[];
  coverImage: string;
}

export function PoetryCollection({ title, poems, coverImage }: PoetryCollectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const poemsPerPage = 4;
  const totalPages = Math.ceil(poems.length / poemsPerPage);

  const indexOfLastPoem = currentPage * poemsPerPage;
  const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;
  const currentPoems = poems.slice(indexOfFirstPoem, indexOfLastPoem);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="mt-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="wait">
          {currentPoems.map((poem, index) => (
            <motion.div
              key={poem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                className="h-full bg-card/50 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 overflow-hidden group relative"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${coverImage})` }}
                />
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <CardTitle className="relative z-10 text-gradient from-primary/80 to-secondary/80 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    {poem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap mb-4 font-serif text-lg text-primary/80 transition-colors duration-300 group-hover:text-primary">{poem.content}</pre>
                  <hr className="my-4 border-primary/20 transition-all duration-300 group-hover:border-primary/40" />
                  <h4 className="text-sm font-semibold mb-2 text-white">Meaning:</h4>
                  <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">{poem.meaning}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          size="sm"
          variant="outline"
          className="border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
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
          className="border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:shadow-md hover:shadow-primary/20"
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

