'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Poem {
  title: string
  content: string
  meaning: string
}

interface FeaturedPoemsProps {
  poems: Poem[]
}

export function FeaturedPoems({ poems }: FeaturedPoemsProps) {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  const nextPoem = () => setCurrentPoemIndex((prevIndex) => (prevIndex + 1) % poems.length);
  const prevPoem = () => setCurrentPoemIndex((prevIndex) => (prevIndex - 1 + poems.length) % poems.length);

  useEffect(() => {
    const interval = setInterval(nextPoem, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPoemIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle className="text-gradient from-primary/80 to-secondary/80">{poems[currentPoemIndex].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap mb-4 font-serif text-lg text-primary/70">{poems[currentPoemIndex].content}</pre>
              <h3 className="font-semibold mb-2 text-gradient from-white/80 to-accent/80">Meaning:</h3>
              <p className="text-sm text-foreground/70">{poems[currentPoemIndex].meaning}</p>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 -mt-6">
        <Button
          onClick={prevPoem}
          size="icon"
          variant="ghost"
          className="bg-background/50 hover:bg-background/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={nextPoem}
          size="icon"
          variant="ghost"
          className="bg-background/50 hover:bg-background/70"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

