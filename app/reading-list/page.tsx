"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import FloatingNav from "@/components/floating-nav"

interface ReadingItem {
  id: string
  title: string
  author: string
  coverImage: string
}

const readingList: ReadingItem[] = [
  {
    id: "1",
    title: "Journey to the West",
    author: "Wu Cheng'en",
    coverImage: "https://press.uchicago.edu/dam/ucp/books/jacket/978/02/26/97/9780226971322.jpg"
  },
  {
    id: "2",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    coverImage: "https://m.media-amazon.com/images/I/618iLg6I3zL.jpg"
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "https://m.media-amazon.com/images/I/81FPzmB5fgL.jpg"
  },
  {
    id: "4",
    title: "Ikigai",
    author: "Hector Garcia and Francesc Miralles",
    coverImage: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  },
  {
    id: "5",
    title: "Dieter Rams",
    author: "Klaus Klemp",
    coverImage: "https://m.media-amazon.com/images/I/71mvTROy+CL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "6",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverImage: "https://m.media-amazon.com/images/I/71sF8kuMW3L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "7",
    title: "Penguin Highway",
    author: "Tomihiko Morimi",
    coverImage: "https://m.media-amazon.com/images/I/715fozvgYRL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: "8",
    title: "The Brand Gap",
    author: "Marty Neumeier",
    coverImage: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTu6T5VSve2eQ3YkxFj-wefbU90rOWNReR3fmap4im_mRKCpmzs"
  },
  {
    id: "9",
    title: "Art of War",
    author: "Sun Tzu",
    coverImage: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781626860605/the-art-of-war-9781626860605_hr.jpg"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function ReadingListPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pt-16 text-foreground">
      <FloatingNav />
      <SectionContainer id="reading-list" className="py-10 sm:py-14 md:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Reading List"
            subtitle="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
            align="left"
            titleClassName="tracking-tight text-3xl sm:text-4xl lg:text-5xl"
            subtitleClassName="max-w-3xl text-sm sm:text-base md:text-lg"
          />
        </motion.div>

        {/* Books Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {readingList.map((book) => (
            <motion.div key={book.id} variants={itemVariants} className="mx-auto w-full max-w-[22rem] sm:max-w-none">
              <Card className="group h-full overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="p-3 pb-0 sm:p-4 sm:pb-0">
                  <AspectRatio ratio={3 / 4}>
                    <img
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      className="h-full w-full rounded-lg object-cover shadow-sm transition-transform duration-700 group-hover:scale-[1.03] md:rounded-xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/300x400/6B7280/ffffff?text=${encodeURIComponent(book.title)}`
                      }}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-black/0 transition-colors group-hover:to-black/10 md:rounded-xl" />
                  </AspectRatio>
                </div>
                <CardContent className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                  <div className="space-y-2">
                    <h3 className="break-words text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-lg md:text-xl">
                      {book.title}
                    </h3>
                    <p className="break-words text-sm text-muted-foreground md:text-base">by {book.author}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-12 text-center sm:mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="mx-auto max-w-2xl text-sm font-light leading-relaxed text-muted-foreground/70">
            This collection represents books that have shaped my perspective on design, technology, and creativity.
            Each title offers unique insights that continue to influence my work and thinking.
          </p>
        </motion.div>
      </SectionContainer>
    </div>
  )
} 