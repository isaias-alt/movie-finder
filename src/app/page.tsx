import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center mt-16">
      <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Movie Finder
      </h1>
      <p className={`text-gray-600 mb-6 ${lora.className}`}>
        Describe your movie and I&apos;ll find the best one for you.
      </p>
    </div>
  );
}
