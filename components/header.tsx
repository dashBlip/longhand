'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Mail, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/40">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
      <div className="relative container mx-auto px-4 py-4">
        <div className="relative flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-8 h-8"
            >
              <Image
                src="https://3wszlvkubakvaz3t.public.blob.vercel-storage.com/longhand-logo-PA3jXlgsqe8mOAD259t4LaH1N3q1aD.png"
                alt="LongHand"
                width={32}
                height={32}
                className="object-contain rounded-full border-1 border-primary"
              />
            </motion.div>
          </Link>
          
          <h1 className="from-primary via-secondary to-accent">
            LongHand
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="https://www.instagram.com/_pencil.eraser" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
            </Link>
            <Link href="mailto:zeke.personal.01@gmail.com">
              <Mail className="h-6 w-6 text-primary hover:text-primary/80 transition-colors" />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-card">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link href="/poetry" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Poetry</Link>
                  <Link href="/stories" className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Stories</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <nav className="hidden md:flex mt-2 space-x-2">
          {[
            { href: '/', label: 'Home' },
            { href: '/poetry', label: 'Poetry' },
            { href: '/stories', label: 'Stories' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-secondary text-secondary-foreground'
                  : 'hover:bg-secondary/20'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

