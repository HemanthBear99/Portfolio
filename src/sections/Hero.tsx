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
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
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
        <HeroOrbit size={800} rotation={-55}>
          <StarIcon className="size-28 text-purple-300" />
        </HeroOrbit>
        <HeroOrbit size={550} rotation={10}>
          <StarIcon className="size-18 text-purple-300" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={100}>
          <StarIcon className="size-8 text-purple-300" />
        </HeroOrbit>
        <HeroOrbit size={990} rotation={140}>
          <StarIcon className="size-38 text-purple-300" />
        </HeroOrbit>
        <HeroOrbit size={430} rotation={140}>
          <SparkleIcon className="size-8 text-purple-300/20" />
        </HeroOrbit>
        <HeroOrbit size={480} rotation={-14}>
          <SparkleIcon className="size-8 text-purple-300/20" />
        </HeroOrbit>
        <HeroOrbit size={880} rotation={104}>
          <SparkleIcon className="size-8 text-purple-300/20" />
        </HeroOrbit>
        <HeroOrbit size={920} rotation={0}>
          <SparkleIcon className="size-10 text-purple-300/20" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={680}>
          <div className="size-3 rounded-full text-purple-300" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-680}>
          <div className="size-2 rounded-full text-purple-300" />
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
            <div className="bg-green-500 size-2.5 rounded-full"></div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">
            Building Exceptional User Experiences
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I have done something and some thing this should be changed in
            hero.tsx file later on{' '}
          </p>
        </div>
        <div className=" flex flex-col items-center mt-8 gap-4 md:flex-row justify-center">
          <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl ">
            <span className="font-semibold"> Explore My Work</span>
            <ArrowDown className="size-4" />
          </button>
          <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
            <span>👋</span>
            <span className="font-semibold ">Let&apos;s Connect</span>
          </button>
        </div>
      </div>
    </div>
  );
};
