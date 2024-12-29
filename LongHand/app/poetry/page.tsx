import { Suspense } from 'react'
import { PoetryCollection } from '@/components/poetry-collection'
import { Separator } from "@/components/ui/separator"
import { parsePoems } from '@/utils/poemParser'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export const revalidate = 3600 // Revalidate every hour

const collectionDescriptions = {
  Veracity: "Short poems, and some pure Hindi-Urdu poetic works.",
  Tabedaar: "A wide range of poetry through the medium of english language"
}

async function PoemsLoader() {
  const poems = await parsePoems()
  const collections = Object.keys(poems)

  return (
    <Accordion type="single" collapsible className="w-full space-y-8">
      {collections.map((collection, index) => (
        <motion.div
          key={collection}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <AccordionItem value={collection} className="border-none">
            <AccordionTrigger className="hover:no-underline [&[data-state=open]>div]:shadow-lg [&[data-state=open]>div]:shadow-primary/30 flex flex-col">
              <div className="w-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-primary/20">
                <div className="relative aspect-[21/9] w-full overflow-hidden">
                  <Image
                    src={collection === "Veracity" 
                    ? "https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/Veracity-ITFPOKh8xt15GZdQ1LVIvrWwMqdoXq.png"
                    : "https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/tabedaar-IhsDMBriC9jAI2lOtTPFNe87FJECUu.png"}
                    alt={`${collection} Cover`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gradient from-primary via-secondary to-accent mb-2">{collection}</h2>
                  <p className="text-sm text-muted-foreground">{collectionDescriptions[collection] || "A beautiful collection of poems."}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mt-2 data-[state=open]:rotate-180" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 p-4 bg-card/30 backdrop-blur-sm rounded-lg">
                <PoetryCollection 
                  title={collection}
                  poems={poems[collection]}
                  coverImage={collection === "Veracity" 
                    ? "https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/Veracity-ITFPOKh8xt15GZdQ1LVIvrWwMqdoXq.png"
                    : "https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/tabedaar-IhsDMBriC9jAI2lOtTPFNe87FJECUu.png"}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  )
}

export default function Poetry() {
  return (
    <div className="px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient from-primary via-secondary to-accent">
        Poetry Collections
      </h1>
      <Separator className="my-8" />
      <Suspense fallback={<div>Loading poems...</div>}>
        <PoemsLoader />
      </Suspense>
      <Separator className="my-8" />
    </div>
  )
}

