"use client"

import Image from "next/image"
import { useState } from "react"
import { Star } from "lucide-react"
import { Movie } from "@/types/tmdb"
import { describeMovie } from "@/services/gemini"
import { searchMovies } from "@/services/tmdb"

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

export default function MainPage() {
  const [searchResults, setSearchResults] = useState<Movie[]>([])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector("input")?.value
    if (!input) return

    try {
      const descriptionResults = await describeMovie(input)

      const tmdbResults = await searchMovies(descriptionResults)
      console.log(tmdbResults)
      setSearchResults(tmdbResults)
    } catch (error) {
      console.error(error)
    }
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
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover mb-4 rounded"
                    width={500}
                    height={281}
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
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded"
                  width={500}
                  height={281}
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