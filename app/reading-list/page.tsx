"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { AspectRatio } from "@/components/ui/aspect-ratio"

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
    <div className="min-h-screen bg-background text-foreground">
      <SectionContainer>
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
            titleClassName="tracking-tight"
            subtitleClassName="max-w-3xl"
          />
        </motion.div>

        {/* Books Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {readingList.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <Card className="group overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="p-4 pb-0">
                  <AspectRatio ratio={3/4}>
                    <img
                      src={book.coverImage}
                      alt={`${book.title} cover`}
                      className="w-full h-full object-cover rounded-lg md:rounded-xl shadow-sm transition-transform duration-700 group-hover:scale-[1.03]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/300x400/6B7280/ffffff?text=${encodeURIComponent(book.title)}`
                      }}
                    />
                    <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/0 group-hover:to-black/10 transition-colors" />
                  </AspectRatio>
                </div>
                <CardContent className="pt-5 pb-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg md:text-xl leading-snug tracking-tight group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">by {book.author}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground/70 font-light max-w-2xl mx-auto">
            This collection represents books that have shaped my perspective on design, technology, and creativity.
            Each title offers unique insights that continue to influence my work and thinking.
          </p>
        </motion.div>
      </SectionContainer>
    </div>
  )
} 