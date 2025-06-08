"use client"

import { motion } from "framer-motion"

interface ReadingItem {
  id: string
  title: string
  author: string
  coverImage: string
}

const readingList: ReadingItem[] = [
  {
    id: "1",
    title: "The Brand Gap",
    author: "Marty Neumeier",
    coverImage: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTu6T5VSve2eQ3YkxFj-wefbU90rOWNReR3fmap4im_mRKCpmzs"
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
    title: "Penguin Highway",
    author: "Tomihiko Morimi",
    coverImage: "https://m.media-amazon.com/images/I/715fozvgYRL._AC_UF1000,1000_QL80_.jpg"
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
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export default function ReadingListPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-24">
        {/* Header Section */}
        <motion.div 
          className="mb-20 md:mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-baseline gap-3 mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Reading List
              {/* <sup className="text-2xl md:text-3xl font-light opacity-60 ml-1">12</sup> */}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed font-light">
            Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands
          </p>
        </motion.div>

        {/* Books Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {readingList.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              {/* Book Cover Container */}
              <div className="mb-6 relative">
                <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg group-hover:shadow-2xl transition-all duration-500 ease-out">
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/300x400/6B7280/ffffff?text=${encodeURIComponent(book.title)}`;
                    }}
                  />
                  
                  {/* Overlay for better text readability on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Book Information */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg md:text-xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {book.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base font-medium">
                  by {book.author}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-muted-foreground/70 font-light max-w-2xl mx-auto">
            This collection represents books that have shaped my perspective on design, technology, and creativity. 
            Each title offers unique insights that continue to influence my work and thinking.
          </p>
        </motion.div>
      </div>
    </div>
  )
} 