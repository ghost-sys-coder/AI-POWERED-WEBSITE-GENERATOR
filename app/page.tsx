import Header from "./_components/Header";
import Hero from "./_components/Hero";
import HomePageFooter from "./_components/HomePageFooter";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero styling="mt-40 sm:mt-35" />
      <HomePageFooter />
    </main>
  )
}