import Navbar from "./Navbar";
import SectionFour from "./SectionFour";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </main>
  );
}
