"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star } from "lucide-react"

interface Mock {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

// Mock data from the provided snippet
const mockMovies: Mock[] = [
  {
    id: 957452,
    title: "The Crow",
    overview: "Soulmates Eric and Shelly are brutally murdered when the demons of her dark past catch up with them. Given the chance to save his true love by sacrificing himself, Eric sets out to seek merciless revenge on their killers, traversing the worlds of the living and the dead to put the wrong things right.",
    poster_path: "/58QT4cPJ2u2TqWZkterDq9q4yxQ.jpg",
    release_date: "2024-08-21",
    vote_average: 5.4,
  },
  {
    id: 1215162,
    title: "Kill 'em All 2",
    overview: "Phillip and Suzanne are retired from the spy game, living peacefully off the grid. That's until their whereabouts are discovered by Vlad, the vengeful brother of their target from the first film.",
    poster_path: "/hgA5hN3NjNNSTXYOmAI6KNKOzbp.jpg",
    release_date: "2024-09-24",
    vote_average: 7.186,
  },
  {
    id: 933260,
    title: "The Substance",
    overview: "A fading celebrity decides to use a black market drug, a cell-replicating substance that temporarily creates a younger, better version of herself.",
    poster_path: "/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    release_date: "2024-09-07",
    vote_average: 7.269,
  },
  {
    id: 1079091,
    title: "It Ends with Us",
    overview: "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
    poster_path: "/cSMdFWmajaX4oUMLx7HEDI84GkP.jpg",
    release_date: "2024-08-07",
    vote_average: 6.92,
  },
  {
    id: 917496,
    title: "Beetlejuice Beetlejuice",
    overview: "After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Betelgeuse, Lydia's life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.",
    poster_path: "/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg",
    release_date: "2024-09-04",
    vote_average: 7.156,
  },
]

export default function MainPage() {
  const [searchResults, setSearchResults] = useState<Mock[]>([])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulating API call with mock data
    setSearchResults(mockMovies)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        MovieFinder
      </h1>
      <Card className="w-full max-w-4xl mx-auto mb-12 shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Search for movies..."
              className="flex-grow text-lg py-6 px-4"
            />
            <Button type="submit" size="lg" className="text-lg py-6 px-8">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.map((movie) => (
          <Dialog key={movie.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover mb-4 rounded"
                  />
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-600">{new Date(movie.release_date).getFullYear()}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{movie.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded"
                />
                <p className="text-sm text-gray-500">
                  Release Date: {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <DialogDescription>{movie.overview}</DialogDescription>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}