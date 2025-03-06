import ArrowDown from '@/assets/icons/arrow-down.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import StarIcon from '@/assets/icons/star.svg';
import grainImage from '@/assets/images/grain.jpg';
import myemojiImage from '@/assets/images/memoji-computer.png';
import { HeroOrbit } from '@/components/HeroOrbit';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <div className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <div className="size-[1420px] hero-ring"></div>
        <div className="size-[1620px] hero-ring"></div>
        <HeroOrbit
          size={220}
          rotation={175}
          shouldOrbit
          orbitDuration="33s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-6 text-purple-300/30" />
        </HeroOrbit>
        <HeroOrbit
          size={300}
          rotation={-340}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-7 text-purple-300/50" />
        </HeroOrbit>
        <HeroOrbit
          size={360}
          rotation={320}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-purple-300/40" />
        </HeroOrbit>
        <HeroOrbit
          size={410}
          rotation={-280}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="10s"
        >
          <div className="size-5 rounded-full text-purple-300/80" />
        </HeroOrbit>
        <HeroOrbit
          size={450}
          rotation={120}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="10s"
        >
          <div className="size-6 rounded-full text-purple-300/70" />
        </HeroOrbit>
        <HeroOrbit
          size={510}
          rotation={-310}
          shouldOrbit
          orbitDuration="35s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-16 text-purple-300/90" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={210}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-13 text-purple-300/60" />
        </HeroOrbit>
        <HeroOrbit
          size={640}
          rotation={-260}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-25 text-purple-400/70" />
        </HeroOrbit>
        <HeroOrbit
          size={680}
          rotation={160}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-9 text-purple-200/50" />
        </HeroOrbit>
        <HeroOrbit
          size={730}
          rotation={-360}
          shouldOrbit
          orbitDuration="49s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-35 text-purple-300/80" />
        </HeroOrbit>
        <HeroOrbit
          size={770}
          rotation={290}
          shouldOrbit
          orbitDuration="52s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-29 text-purple-500/70" />
        </HeroOrbit>
        <HeroOrbit
          size={810}
          rotation={-150}
          shouldOrbit
          orbitDuration="54s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-12 text-purple-300/30" />
        </HeroOrbit>
        <HeroOrbit
          size={860}
          rotation={240}
          shouldOrbit
          orbitDuration="56s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-15 text-purple-300/50" />
        </HeroOrbit>
        <HeroOrbit
          size={900}
          rotation={-330}
          shouldOrbit
          orbitDuration="58s"
          shouldSpin
          spinDuration="10s"
        >
          <StarIcon className="size-48 text-purple-300/90" />
        </HeroOrbit>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={myemojiImage}
            alt="emoji computer"
            className="size-[100px]"
          />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-4xl">
            Transforming Ideas Into Exceptional Digital Experiences
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            Building high-performance, visually stunning web products that drive
            results and leave lasting impressions.
          </p>
        </div>
        <div className=" flex flex-col items-center mt-8 gap-4 md:flex-row justify-center">
          <a
            href="#projects"
            role="button"
            className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl group"
          >
            <span className="font-semibold">Explore My Work</span>
            <ArrowDown className="size-4 animate-bounce-color group-hover:animate-pulse-scale" />
          </a>

          <a
            href="mailto:appalahemanth413@gmail.com?subject=Let's%20Work%20Together&body=Hi%20there%2C%20I'm%20interested%20in%20working%20with%20you!"
            className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl"
          >
            <span className="animate-wave-hand inline-block">👋</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </a>
        </div>
      </div>
    </div>
  );
};
