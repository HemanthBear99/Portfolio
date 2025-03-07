'use client';
import KafkaIcon from '@/assets/icons/Apache Kafka.svg';
import AwsIcon from '@/assets/icons/AWS.svg';
import CssIcon from '@/assets/icons/CSS.svg';
import DockerIcon from '@/assets/icons/Docker.svg';
import GitIcon from '@/assets/icons/Git.svg';
import HibernateIcon from '@/assets/icons/Hibernate.svg';
import HtmlIcon from '@/assets/icons/HTML.svg';
import JavaIcon from '@/assets/icons/Java.svg';
import JavaScriptIcon from '@/assets/icons/JavaScript.svg';
import JenkinsIcon from '@/assets/icons/Jenkins.svg';
import KubernetesIcon from '@/assets/icons/Kubernetes.svg';
import MongoDbIcon from '@/assets/icons/MongoDB.svg';
import MysqlIcon from '@/assets/icons/MySQL.svg';
import ReactIcon from '@/assets/icons/react.svg';
import TypeScriptIcon from '@/assets/icons/TypeScript.svg';
import bookImage from '@/assets/images/book-cover.png';
import mapImage from '@/assets/images/map.png';
import smileMemoji from '@/assets/images/memoji-smile.png';
import { Card } from '@/components/Card';
import { CardHeader } from '@/components/CardHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { ToolboxItems } from '@/components/ToolboxItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const toolboxItems = [
  {
    title: 'JavaScript',
    iconType: JavaScriptIcon,
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'CSS',
    iconType: CssIcon,
  },
  {
    title: 'HTML',
    iconType: HtmlIcon,
  },
  {
    title: 'Git',
    iconType: GitIcon,
  },
  {
    title: 'TypeScript',
    iconType: TypeScriptIcon,
  },
  {
    title: 'Java',
    iconType: JavaIcon,
  },
  {
    title: 'Hibernate',
    iconType: HibernateIcon,
  },
  {
    title: 'Jenkins',
    iconType: JenkinsIcon,
  },
  {
    title: 'MySQL',
    iconType: MysqlIcon,
  },
  {
    title: 'MongoDB',
    iconType: MongoDbIcon,
  },
  {
    title: 'Apache Kafka',
    iconType: KafkaIcon,
  },
  {
    title: 'Docker',
    iconType: DockerIcon,
  },
  {
    title: 'Kubernetes',
    iconType: KubernetesIcon,
  },
  {
    title: 'AWS',
    iconType: AwsIcon,
  },
];

const hobbies = [
  {
    title: 'Painting',
    emoji: '🎨',
    left: '55%',
    top: '50%',
  },
  {
    title: 'Photography',
    emoji: '📸',
    left: '80%',
    top: '40%',
  },
  {
    title: 'Chess',
    emoji: '♟️',
    left: '10%',
    top: '10%',
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '30%',
    top: '50%',
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '60%',
    top: '10%',
  },
  {
    title: 'Music',
    emoji: '🎵',
    left: '45%',
    top: '80%',
  },
  {
    title: 'Traveling',
    emoji: '✈️',
    left: '75%',
    top: '65%',
  },
  {
    title: 'Cooking',
    emoji: '👨‍🍳',
    left: '5%',
    top: '55%',
  },
  {
    title: 'Cycling',
    emoji: '🚴‍♂️',
    left: '35%',
    top: '20%',
  },
  {
    title: 'Writing',
    emoji: '✍️',
    left: '15%',
    top: '80%',
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);

  return (
    <motion.div className="py-20 lg:py-28 scroll" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description=" More about who I am and what makes me special. This should be changed in About.tsx file"
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Blogs"
                description="Where I share ideas, insights, and lessons from my journey."
                className="px-6 pt-6"
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="These tools sharpened my skills and changed how I build and think."
                className=""
              />
              <ToolboxItems
                items={toolboxItems}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:60s]"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:50s]"
              />
            </Card>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore the passions and pursuits that fuel my growth, creativity, and well-rounded perspective."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-purple-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card
              className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1 cursor-pointer overflow-hidden group"
              onClick={() => {
                const latitude = 17.51144358943926;
                const longitude = 80.59328539442505;
                window.open(
                  `https://www.google.com/maps?q=${latitude},${longitude}`,
                  '_blank'
                );
              }}
            >
              {/* Map overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10"></div>

              {/* Map image with zoom effect on hover */}
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Central memoji with animations */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full z-20 transition-transform duration-300 ease-out group-hover:scale-105 after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                {/* Outer ping animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>

                {/* Inner gradient background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-sky-400 -z-10"></div>

                {/* Memoji image */}
                <Image
                  src={smileMemoji}
                  alt="smiling memoji"
                  className="size-20"
                />
              </div>

              {/* Contact info card that slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 transform transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 flex flex-col gap-2 z-20">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-500"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Find Me Here
                </h3>
                <p className="text-sm text-gray-600">
                  Click to view my location on Google Maps
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center justify-center bg-gray-900 text-white rounded-full p-1.5 animate-bounce">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 7 7 7-7"></path>
                      <path d="M12 19V5"></path>
                    </svg>
                  </span>
                  <span className="text-xs text-gray-500">
                    Tap to open maps
                  </span>
                </div>
              </div>

              {/* Small floating indicator */}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 flex items-center gap-1.5 shadow-lg animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact Me
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
