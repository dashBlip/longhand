import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { parsePoems } from '@/utils/poemParser'
import { FeaturedPoems } from '@/components/featured-poems'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const poems = await parsePoems()
  const featuredPoems = Object.values(poems).flat().slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-2xl" />
        <Image
          src="https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/longhand-logo-PA3jXlgsqe8mOAD259t4LaH1N3q1aD.png?height=200&width=200"
          alt="Writer's portrait"
          width={200}
          height={200}
          className="mx-auto rounded-full mb-6 border-2 border-dark relative z-10"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient from-primary via-secondary to-accent">
        It's LongHand - Ars Verborum
      </h1>
      <p className="text-md md:text-md mb-6 text-foreground/80">
        Explore the world of words through poetry and stories crafted with passion and purpose.
      </p>
      <Card className="bg-card/50 backdrop-blur-sm mb-8 overflow-hidden">
        <CardContent className="pt-6 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <p className="text-md md:text-md mb-6 text-foreground/70">
            Dive into the realms of "Veracity" and "Tabedaar" in our poetry collection, or immerse yourself in our featured book, "Dusk We Shared". This is where emotions meet paper, creating an unforgettable journey through the power of words.
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/poetry">Explore Poetry</Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
          <Link href="/stories">Discover Stories</Link>
        </Button>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gradient from-primary via-secondary to-accent">
        Featured Works
      </h2>
      <FeaturedPoems poems={featuredPoems} />
    </div>
  )
}

