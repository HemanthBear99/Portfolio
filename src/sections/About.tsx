'use client';
import AwsIcon from '@/assets/icons/AWS.svg';
import KafkaIcon from '@/assets/icons/Apache Kafka.svg';
import CssIcon from '@/assets/icons/css3.svg';
import DockerIcon from '@/assets/icons/docker.svg';
import GitIcon from '@/assets/icons/git.svg';
import HibernateIcon from '@/assets/icons/hibernate.svg';
import HtmlIcon from '@/assets/icons/html5.svg';
import JavaIcon from '@/assets/icons/java.svg';
import JavaScriptIcon from '@/assets/icons/javascript.svg';
import JenkinsIcon from '@/assets/icons/jenkins.svg';
import KubernetesIcon from '@/assets/icons/kubernetes.svg';
import MongoDbIcon from '@/assets/icons/mongodb.svg';
import MysqlIcon from '@/assets/icons/mysql.svg';
import ReactIcon from '@/assets/icons/react.svg';
import TypeScriptIcon from '@/assets/icons/typescript.svg';
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
                title="My Reads"
                description="Explore the books shaping my perspectives should change in about.tsx"
                className="px-6 pt-6"
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the books shaping my perspectives should change in about.tsx"
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
                description="Explore my interests and hobbies that make me a well-rounded should change in about.tsx"
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
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full  after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>

                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-sky-400 -z-10"></div>
                <Image
                  src={smileMemoji}
                  alt="smiling memoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
