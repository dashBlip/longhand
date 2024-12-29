'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PoemPreviewProps {
  poem: {
    title: string
    content: string
    collection: string
  }
  index: number
}

export function PoemPreview({ poem, index }: PoemPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gradient from-primary to-secondary">{poem.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70 mb-2">{poem.content}</p>
          <p className="text-xs text-muted-foreground">From the "{poem.collection}" collection</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

