import MainPage from "@/components/pages/MainPage";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export default function HomePage() {
  return (
    <MainPage />
  );
}
