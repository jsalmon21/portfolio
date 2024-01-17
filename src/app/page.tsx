import { Navigation } from "@/components/Navigation";
import { Particles } from "@/components/Particles";
import { KineticEnergy } from "@/components/KineticEnergy";

export default function Home() {
  return (
    <>
      <Navigation />
      <main
        id="main"
        className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black"
      >
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <KineticEnergy className="absolute inset-0 -z-10 animate-fade-in" />
        <h1 className="p-2 text-center z-10 text-4xl text-transparent bg-white cursor-default text-edge-outline animate-title font-display font-bold sm:text-5xl md:text-6xl whitespace-nowrap bg-clip-text">
          jason vincent
        </h1>
        <h2 className="block text-sm md:text-base font-normal animate-fade-in cursor-default">
          web designer &amp; developer
        </h2>
      </main>
    </>
  );
}
