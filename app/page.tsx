"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const AnimatedParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      life: number;
    }>
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 250; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: Math.random() * 100,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: (particle.x + particle.vx + 100) % 100,
          y: (particle.y + particle.vy + 100) % 100,
          life: particle.life + 1,
          opacity: 0.2 + Math.sin(particle.life * 0.02) * 0.3,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.3)`,
            transition: "all 0.05s linear",
          }}
        />
      ))}

      <div
        className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-400/30 rotate-45 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "4s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-6 h-6 bg-cyan-400/30 rounded-full animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-4 h-8 bg-blue-300/30 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
      <div
        className="absolute top-2/3 right-1/3 w-6 h-6 bg-teal-400/30"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-5 h-5 bg-blue-500/30 rounded-full animate-ping"
        style={{ animationDelay: "3s", animationDuration: "4s" }}
      />
    </div>
  );
};

// Contact links (edit these)
const LINKS = {
  linkedin: "https://www.linkedin.com/in/ameer-shaik-087791218/",
  github: "https://github.com/ameer-sk1401",
  email: "mailto:ameersk1401@gmail.com",
};

// Navigation component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-white">AS</div>
          <div className="flex space-x-6">
            {["Skills", "Education", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero section component
const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-between px-8 lg:px-16 relative"
    >
      <div className="flex-1 max-w-2xl">
        <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
          Hi, there!
        </h1>
        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
          I am <span className="text-blue-300">Ameer Shaik</span>
        </h2>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          Cloud Solutions Engineer from Binghamton, NY: Bridging the Gap Between
          Development and Operations While Crafting the Future of Scalable Cloud
          Infrastructure and Automated Deployments.
        </p>
        <div className="flex items-center space-x-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center relative">
        <div className="relative">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img
                src="/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills section component
const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "SQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "NoSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Go",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        },
        {
          name: "Bash",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
        },
      ],
    },
    {
      title: "Cloud Services (AWS)",
      skills: [
        {
          name: "EC2",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="ec2-gradient"
                >
                  <stop stopColor="#C8511B" offset="0%"></stop>
                  <stop stopColor="#F90" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#ec2-gradient)"></path>
                <path
                  d="M26.052 27L26 13.948 13 14v13.052L26.052 27zM27 14h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v2h2v1h-2v.052a.95.95 0 01-.948.948H26v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-2v2h-1v-2h-.052a.95.95 0 01-.948-.948V27h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-.052a.95.95 0 01.948-.948H13v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h2v-2h1v2h.052a.95.95 0 01.948.948V14zm-6 19H7V19h2v-1H7.062C6.477 18 6 18.477 6 19.062v13.876C6 33.523 6.477 34 7.062 34h13.877c.585 0 1.061-.477 1.061-1.062V31h-1v2zM34 7.062v13.876c0 .585-.476 1.062-1.061 1.062H30v-1h3V7H19v3h-1V7.062C18 6.477 18.477 6 19.062 6h13.877C33.524 6 34 6.477 34 7.062z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "S3",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="s3-gradient"
                >
                  <stop stopColor="#1B660F" offset="0%"></stop>
                  <stop stopColor="#6CAE3E" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#s3-gradient)"></path>
                <path
                  d="M30.074 22.671l.2-1.301c1.703 1.016 1.735 1.444 1.732 1.46-.004.003-.308.24-1.932-.159zm-10.185-3.733a.995.995 0 01-.992.994.994.994 0 010-1.99c.547 0 .992.448.992.996zm7.869 12.33c0 .123-.495.31-.93.478l-.445.17c-.475.189-1.037.359-1.669.504-1.576.366-3.75.585-5.817.585-5.503 0-8.435-1.009-8.439-1.798L8.256 13.57c1.899 1.452 5.8 2.382 10.641 2.382 4.63 0 9.364-.897 11.584-2.472l-1.366 8.92c-2.871-.874-6.392-2.56-8.132-3.398l-.105-.05.002-.015c0-1.098-.89-1.99-1.983-1.99a1.988 1.988 0 00-1.983 1.99c0 1.097.89 1.99 1.983 1.99.733 0 1.367-.407 1.71-1.002 1.806.868 5.41 2.591 8.356 3.468l-1.205 7.874zm-8.86-23.273c6.676 0 11.857 1.86 11.894 3.465l-.024.148c-.27 1.579-5.352 3.35-11.87 3.35-6.388 0-10.71-1.725-10.89-3.375l-.015-.12c.023-1.678 4.397-3.468 10.904-3.468zm11.538 12.318l1.344-8.76c.001-.026.006-.05.006-.076C31.786 8.674 25.233 7 18.897 7 12.003 7 7 8.883 7 11.477l.003.061 2.468 19.73c0 2.6 7.852 2.732 9.426 2.732 2.137 0 4.394-.228 6.04-.61a12.74 12.74 0 001.81-.548l.432-.167c.844-.321 1.57-.598 1.564-1.331l1.18-7.684c.655.158 1.197.24 1.63.24.58-.001.973-.143 1.21-.428a.982.982 0 00.219-.832c-.127-.681-.923-1.405-2.546-2.327z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "VPC",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="vpc-gradient"
                >
                  <stop stopColor="#4D27A8" offset="0%"></stop>
                  <stop stopColor="#A166FF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#vpc-gradient)"></path>
                <path
                  d="M30.971 21.03l-2.944-1.263v10.489c2.546-.352 2.932-2.968 2.948-3.087l-.004-6.14zm-3.944 9.24V19.76l-3.035 1.273v6.2c.012.055.445 2.768 3.035 3.037zm.306-11.722a.5.5 0 01.391 0l3.944 1.693a.5.5 0 01.303.459v6.534c-.183 1.447-1.357 4.063-4.527 4.063-3.075 0-4.254-2.612-4.448-3.994l-.004-6.603c0-.201.121-.383.306-.461l4.035-1.691zm5.65.637l-5.461-2.406-5.53 2.327v7.128c-.001.042-.054 2.868 1.657 4.623.917.94 2.194 1.419 3.795 1.419 1.602 0 2.887-.48 3.819-1.422 1.735-1.758 1.72-4.585 1.72-4.613v-7.056zM31.98 31.55c-1.127 1.144-2.654 1.725-4.536 1.725-1.884 0-3.404-.581-4.517-1.727-2.005-2.063-1.939-5.197-1.935-5.33v-7.445a.5.5 0 01.305-.461l6.035-2.54a.5.5 0 01.396.004l5.956 2.625c.182.08.299.259.299.457v7.375c.002.125.027 3.255-2.003 5.317zm-20.988-7.314h8v1h-8c-2.811 0-4.811-2.016-4.979-5.016A3.745 3.745 0 016 19.84c0-2.508 1.318-4.222 3.817-4.978a8.352 8.352 0 01-.032-.647c0-2.916 1.577-5.445 4.017-6.445 3.298-1.348 7.042-.895 9.106 1.104a8.232 8.232 0 011.76 2.485c.609-.451 1.4-.663 2.349-.614 1.78.09 3.149 1.713 3.433 4.007 1.498.124 2.485.883 3.01 2.308l-.937.346c-.428-1.157-1.208-1.673-2.531-1.673a.5.5 0 01-.5-.47c-.138-2.338-1.406-3.463-2.526-3.52-.948-.05-1.645.22-2.079.792a.506.506 0 01-.473.193.503.503 0 01-.395-.323 7.378 7.378 0 00-1.807-2.814c-1.788-1.73-5.09-2.1-8.031-.895-2.063.845-3.396 3.01-3.396 5.519 0 .273.035.696.066.959a.498.498 0 01-.376.544C8.169 16.29 7 17.678 7 19.842c0 .1-.001.2.009.302.141 2.495 1.703 4.093 3.983 4.093z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "RDS",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="rds-gradient"
                >
                  <stop stopColor="#2E27AD" offset="0%"></stop>
                  <stop stopColor="#527FFF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#rds-gradient)"></path>
                <path
                  d="M11.854 28.854L7.708 33H10.5v1h-4a.5.5 0 01-.5-.5v-4h1v2.793l4.147-4.146.707.707zM33 29.5h1v4c0 .277-.223.5-.5.5h-4v-1h2.793l-4.146-4.146-.707-.707L32.293 7H29.5V6h4a.5.5 0 01.5.5zm-27 4H6v-4a.5.5 0 01.5-.5h4v1H7.527l4.319 4.14-.691.721L7 7.88v2.62zm25.726 8.9c0-1.558-1.806-3.1-4.83-4.123l.32-.947c3.502 1.185 5.51 3.033 5.51 5.07 0 2.037-2.008 3.886-5.51 5.071l-.32-.948c3.024-1.023 4.83-2.565 4.83-4.123zm-24.989 0c0 1.492 1.69 2.993 4.521 4.014l-.34.94c-3.293-1.187-5.181-2.993-5.181-4.954 0-1.961 1.888-3.767 5.181-4.955l.34.941c-2.831 1.021-4.521 2.522-4.521 4.014zm12.286-3.681c-3.136 0-4.891-.799-4.917-1.125.026-.326 1.781-1.125 4.917-1.125 3.133 0 4.89.798 4.917 1.125-.027.326-1.784 1.125-4.917 1.125zm0 3.555c-3.182 0-4.917-.926-4.917-1.402v-2.03c1.135.595 3.069.877 4.917.877 1.848 0 3.782-.282 4.917-.877v2.03c0 .476-1.735 1.402-4.917 1.402zm0 3.737c-3.182 0-4.917-.927-4.917-1.403v-2.343c1.119.665 3.023 1.009 4.917 1.009 1.894 0 3.798-.344 4.917-1.009v2.343c0 .476-1.735 1.403-4.917 1.403zm0-13.821c-2.85 0-5.917.665-5.917 2.125v10.311c0 1.566 2.977 2.385 5.917 2.385s5.917-.819 5.917-2.385V14.594c0-1.46-3.067-2.125-5.917-2.125z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "Lambda",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="lambda-gradient"
                >
                  <stop stopColor="#C8511B" offset="0%"></stop>
                  <stop stopColor="#F90" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#lambda-gradient)"></path>
                <path
                  d="M14.386 33H8.27l6.763-14.426 3.064 6.44L14.387 33zm1.085-15.798a.49.49 0 00-.442-.282h-.002a.493.493 0 00-.441.285l-7.538 16.08a.507.507 0 00.028.482c.09.145.247.233.415.233h7.206c.19 0 .363-.111.445-.286l3.944-8.489a.508.508 0 00-.002-.432l-3.613-7.591zM32.018 33h-5.882l-9.47-20.711a.491.491 0 00-.444-.289H12.37l.005-5h7.549l9.424 20.71c.08.177.256.29.446.29h2.224v5zm.49-6h-2.4L20.684 6.29a.492.492 0 00-.446-.29h-8.353a.496.496 0 00-.491.5l-.006 6c0 .132.052.259.144.354a.488.488 0 00.347.146h4.032l9.468 20.711c.08.176.254.289.445.289h6.686a
.495.495 0 00.491-.5v-6c0-.276-.219-.5-.491-.5z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "QuickSight",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="quicksight-gradient"
                >
                  <stop stopColor="#4D27A8" offset="0%"></stop>
                  <stop stopColor="#A166FF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#quicksight-gradient)"></path>
                <path
                  d="M33 13a1.001 1.001 0 00-2.002 0 1.001 1.001 0 002.001 0zM21.51 24a1.001 1.001 0 00-2.002 0 1.001 1.001 0 002.002 0zm-1.001-7c.551 0 1-.449 1-1a1.001 1.001 0 00-2 0c0 .551.448 1 1 1zM10.002 27a1.001 1.001 0 00-2.001 0 1.001 1.001 0 002.001 0zM34 13c0 1.103-.898 2-2.001 2-.376 0-.724-.11-1.024-.291l-8.926 8.029c.283.345.461.781.461 1.262 0 1.103-.898 2-2.001 2a2.003 2.003 0 01-2.001-2c0-2.508 1.318-4.222 3.817-4.978a8.352 8.352 0 01-.032-.647c0-2.916 1.577-5.445 4.017-6.445 3.298-1.348 7.042-.895 9.106 1.104a8.232 8.232 0 011.76 2.485c.609-.451 1.4-.663 2.349-.614 1.78.09 3.149 1.713 3.433 4.007 1.498.124 2.485.883 3.01 2.308l-.937.346c-.428-1.157-1.208-1.673-2.531-1.673a.5.5 0 01-.5-.47c-.138-2.338-1.406-3.463-2.526-3.52-.948-.05-1.645.22-2.079.792a.506.506 0 01-.473.193.503.503 0 01-.395-.323 7.378 7.378 0 00-1.807-2.814c-1.788-1.73-5.09-2.1-8.031-.895-2.063.845-3.396 3.01-3.396 5.519 0 .273.035.696.066.959a.498.498 0 01-.376.544C8.169 16.29 7 17.678 7 19.842c0 .1-.001.2.009.302.141 2.495 1.703 4.093 3.983 4.093z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "IAM",
          icon: (
            <svg
              className="w-full h-full"
              height="48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 25.001h4v-2h-4v2zm-11 2h7v-7H4v7zm8 2H3a1 1 0 01-1-1v-9a1 1 0 011-1h9a1 1 0 011 1v9a1 1 0 01-1 1zm31.2-2l-3.2-5.11-3.2 5.11h6.4zm2.67 1.48a1.002 1.002 0 01-.87.52H35a1 1 0 01-.851-1.53l5-8a1 1 0 011.702 0l5 8c.187.308.195.694.019 1.01zM43 41.001a3 3 0 10-6 0 3 3 0 006 0zm2 0a5 5 0 01-9.899 1H7a1 1 0 01-1-1v-10h2v9h27.101a4.998 4.998 0 015.894-3.905A4.999 4.999 0 0145 41.001zm-23-16h4v-2h-4v2zm15-18a3 3 0 106 0 3 3 0 00-6 0zm-29 9H6v-9a1 1 0 011-1h28.101a4.999 4.999 0 119.796 2 5 5 0 01-9.796 0H8v8zm21 9h4v-2h-4v2z"
                fill="#BF0816"
                fillRule="evenodd"
              ></path>
            </svg>
          ),
        },
        {
          name: "DynamoDB",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="dynamodb-gradient"
                >
                  <stop stopColor="#2E27AD" offset="0%"></stop>
                  <stop stopColor="#527FFF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#dynamodb-gradient)"></path>
                <path
                  d="M26.066 31.019v-2.866c-1.526 1.308-4.694 2.17-8.538 2.17-3.847 0-7.015-.863-8.541-2.172v2.863c0 1.411 3.508 2.984 8.54 2.984 5.027 0 8.531-1.57 8.54-2.98zm.001-8.175l.987-.006v.006c0 .625-.312 1.207-.906 1.742.726.653.906 1.294.906 1.75l-.001.008v4.67c0 2.272-4.094 3.986-9.525 3.986-5.403 0-9.48-1.696-9.523-3.951 0-.01-.005-.009-.005-.014C8.023 7.706 12.109 6 17.528 6c2.608 0 5.114.43 6.874 1.177l-.381.925c-1.643-.7-4.01-1.1-6.493-1.1-5.033 0-8.54 1.573-8.54 2.984 0 1.413 3.507 2.986 8.54 2.986.138.001.268 0 .403-.006l.04 1c-.148.008-.296.008-.443.008-3.847 0-7.015-.863-8.541-2.172v2.874c.006.545.543 1.02.992 1.322 1.348.89 3.763 1.496 6.454 1.622l-.047 1c-2.723-.126-5.11-.712-6.645-1.608-.384.295-.753.692-.753 1.15 0 1.411 3.507 2.984 8.54 2.984.496 0 .98-.017 1.453-.05l.072.998c-.496.036-1.006.054-1.525.054-3.847 0-7.015-.862-8.541-2.171v2.861c.006.558.542 1.033.992 1.334 1.54 1.018 4.434 1.65 7.549 1.65h.219v1.003h-.22c-3.165 0-6.029-.612-7.785-1.641-.384.295-.754.693-.754 1.152 0 1.411 3.507 2.984 8.54 2.984 5.024 0 8.527-1.567 8.538-2.978V26.333c0-.455-.367-.85-.749-.145-.243.143-.505.28-.801.406l-.382-.922c.362-.156.678-.323.939-.5.453-.306.994-.786.994-1.328zm5.288-8.355h-3.283a.491.491 0 01-.4-.21a.506.506 0 01-.067-.452l1.455-4.348h-6.528l-3.121 6.012h3.169a.49.49 0 01.392.197a.505.505 0 01.084.436l-2.718 10.108 11.017-11.743zm1.51-.155L19.705 28.36a.493.493 0 01-.6.09a.505.505 0 01-.233-.568l3.063-11.39h-3.342a.492.492 0 01-.423-.242a.505.505 0 01-.014-.492l3.642-7.013a.493.493 0 01.436-.267h7.515c.16 0 .309.078.401.209a.51.51 0 01.066.453l-1.455 4.347h3.746c.198 0 .376.12.454.304a.51.51 0 01-.096.543zM9.728 31.04c.571.332 1.27.626 2.079.87l.281-.96c-.734-.222-1.363-.484-1.869-.779l-.491.869zm2.079-7.232l.281-.96c-.732-.221-1.36-.484-1.869-.78l-.491.87c.573.334 1.273.627 2.079.87zm-2.08-8.974l.492-.868c.505.294 1.135.558 1.87.78l-.282.96c-.81-.244-1.508-.538-2.08-.872z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "CloudWatch",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="cloudwatch-gradient"
                >
                  <stop stopColor="#B0084D" offset="0%"></stop>
                  <stop stopColor="#FF4F8B" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#cloudwatch-gradient)"></path>
                <path
                  d="M11.056 28.594a2.09 2.09 0 01-2.08-2.096 2.09 2.09 0 012.08-2.095c1.146 0 2.08.94 2.08 2.095a2.09 2.09 0 01-2.08 2.096zm1.857.363a3.093 3.093 0 001.223-2.459c0-1.711-1.382-3.103-3.08-3.103-.42 0-.817.086-1.181.24l-1.799-3.139 2.362-4.122-.865-.504-2.506 4.375a.504.504 0 000 .503l1.966 3.43a3.09 3.09 0 00-1.056 2.32c0 1.712 1.38 3.104 3.079 3.104.342 0 .665-.07.973-.174l1.531 2.844a.5.5 0 00.44.263h5.5v-1.008h-5.203l-1.385-2.57zM29.944 16.56a2.09 2.09 0 01-2.08-2.096 2.09 2.09 0 012.08-2.096 2.09 2.09 0 012.078 2.096 2.09 2.09 0 01-2.079 2.096zm2.023.224a3.095 3.095 0 001.055-2.32c0-1.711-1.38-3.104-3.079-3.104-.34 0-.662.07-.97.173L27.442 8.62A.497.497 0 0027 8.351h-5.5V9.36h5.2l1.39 2.644a3.1 3.1 0 00-1.226 2.462c0 1.71 1.381 3.103 3.08 3.103.42 0 .818-.086 1.18-.24l1.799 3.14-2.362 4.12.866.504 2.505-4.373a.504.504 0 000-.504l-1.965-3.43zm-4.573 16.207a2.09 2.09 0 01-2.08-2.095 2.09 2.09 0 012.08-2.095 2.09 2.09 0 012.079 2.095 2.09 2.09 0 01-2.08 2.095zm-9.19-8.491l-2.293-4.002 2.292-4h4.584l2.294 4-2.294 4.002h-4.584zm-4.568-12.303a2.09 2.09 0 01-2.08-2.095 2.09 2.09 0 012.08-2.095c1.146 0 2.08.94 2.08 2.095a2.09 2.09 0 01-2.08 2.095zm13.758 15.596c-.625 0-1.206.191-1.692.515l-2.07-3.267 2.46-4.29a.504.504 0 000-.504l-2.582-4.505a.498.498 0 00-.433-.252h-4.752l-2.279-3.481a3.088 3.088 0 00.67-1.907c0-1.711-1.382-3.103-3.08-3.103-1.699 0-3.08 1.392-3.08 3.103 0 1.712 1.381 3.103 3.08 3.103a3.04 3.04 0 001.668-.502l2.09 3.194-2.492 4.35a.504.504 0 000 .503l2.58 4.506a.497.497 0 00.433.252h4.828l2.218 3.505A3.092 3.092 0 0027.395 34c1.698 0 3.079-1.393 3.079-3.103 0-1.712-1.381-3.103-3.08-3.103z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "CodeDeploy",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="codedeploy-gradient"
                >
                  <stop stopColor="#2E27AD" offset="0%"></stop>
                  <stop stopColor="#527FFF" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#codedeploy-gradient)"></path>
                <path
                  d="M30.877 27a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093A1.1 1.1 0 0130.876 27zm0-16.03a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm1.01 8.015a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm-4.607 1.593h2.561a2.108 2.108 0 002.046 1.593A2.106 2.106 0 0034 20.078a2.106 2.106 0 00-2.114-2.093c-.992 0-1.818.681-2.046 1.593H27.28v-7.015h1.551a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093 2.106 2.106 0 00-2.114-2.093c-.991 0-1.818.681-2.046 1.593h-2.056a.502.502 0 00-.505.5v7.515h-3.061v1h3.061v7.515c0 .277.226.5.505.5h2.056a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093A2.106 2.106 0 0030.876 26c-.991 0-1.818.681-2.046 1.593H27.28v-7.015z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "ECS",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="ecs-gradient"
                >
                  <stop stopColor="#C8511B" offset="0%"></stop>
                  <stop stopColor="#F90" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#ecs-gradient)"></path>
                <path
                  d="M32 24.25l-4-2.357v-6.068a.492.492 0 00-.287-.444L22 12.736V8.285l10 4.897V24.25zm.722-11.811l-11-5.387a.504.504 0 00-.485.022.49.49 0 00-.237.417v5.557c0 .19.111.363.287.444L27 16.136v6.035c0 .172.091.332.243.42l5 2.947a.501.501 0 00.757-.42v-12.24a.49.49 0 00-.278-.44zM19.995 32.952L9 27.317V13.169l9-4.849v4.442l-4.746 2.636a.488.488 0 00-.254.427v8.842a.49.49 0 00.258.43l6.5 3.515a.508.508 0 00.482.001l6.25-3.371 3.546 2.33-10.041 5.38zm6.799-8.693a.51.51 0 00-.519-.022L20 27.622l-6-3.245v-8.265l4.746-2.637a.489.489 0 00.254-.427V7.49a.489.489 0 00-.245-.422.512.512 0 00-.496-.01l-10 5.388a.49.49 0 00-.259.43v14.737c0 .184.103.35.268.436l11.5 5.895a.52.52 0 00.471-.005l11-5.895a.486.486 0 00.039-.839l-4.484-2.947z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "SNS",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="sns-gradient"
                >
                  <stop stopColor="#B0084D" offset="0%"></stop>
                  <stop stopColor="#FF4F8B" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#sns-gradient)"></path>
                <path
                  d="M7.01 20.078a1.1 1.1 0 011.105-1.093 1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.105-1.093zM20.776 33C14.813 33 9.645 28.375 8.47 22.136a2.1 2.1 0 001.69-1.558h2.949v-1h-2.95a2.104 2.104 0 00-1.653-1.554C9.72 12.252 14.838 8 20.776 8c2.933 0 5.354.643 7.194 1.911l.575-.821C26.534 7.703 23.92 7 20.776 7c-6.51 0-12.104 4.726-13.308 11.096C6.62 18.368 6 19.149 6 20.078c0 .916.602 1.688 1.431 1.971C8.591 28.894 14.24 34 20.776 34c3.285 0 6.788-1.667 8.786-3.094l-.59-.811C26.947 31.541 23.627 33 20.777 33zM14.79 18.242c1.111.274 2.523.321 3.343.321.833 0 2.271-.047 3.402-.32l-2.401 5.014a.507.507 0 00-.048.215v2.324l-1.957.915v-3.239a.514.514 0 00-.044-.206l-2.295-5.024zm3.343-1.757c2.314 0 3.554.311 3.951.52-.417.234-1.745.558-3.95.558-2.184 0-3.483-.327-3.873-.558.37-.206 1.582-.52 3.872-.52zm-1.78 11.438a.511.511 0 00.486.03l2.968-1.388a.5.5 0 00.288-.452v-2.529l2.909-6.074a.806.806 0 00.189-.51c0-1.252-2.751-1.515-5.06-1.515-2.266 0-4.969.263-4.969 1.515 0 .19.067.355.18.502l2.775 6.077V27.5c0 .172.088.331.235.423zM30.877 27a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093A1.1 1.1 0 0130.876 27zm0-16.03a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm1.01 8.015a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm-4.607 1.593h2.561a2.108 2.108 0 002.046 1.593A2.106 2.106 0 0034 20.078a2.106 2.106 0 00-2.114-2.093c-.992 0-1.818.681-2.046 1.593H27.28v-7.015h1.551a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093 2.106 2.106 0 00-2.114-2.093c-.991 0-1.818.681-2.046 1.593h-2.056a.502.502 0 00-.505.5v7.515h-3.061v1h3.061v7.515c0 .277.226.5.505.5h2.056a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093A2.106 2.106 0 0030.876 26c-.991 0-1.818.681-2.046 1.593H27.28v-7.015z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "SQS",
          icon: (
            <svg
              className="w-full h-full"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                  id="sqs-gradient"
                >
                  <stop stopColor="#B0084D" offset="0%"></stop>
                  <stop stopColor="#FF4F8B" offset="100%"></stop>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h40v40H0z" fill="url(#sqs-gradient)"></path>
                <path
                  d="M14.342 22.35l1.505-1.444a.501.501 0 00.013-.708l-1.505-1.555-.72.695.676.7h-2.32v.999h2.274l-.617.592.694.72zm12.016.003l1.55-1.453a.5.5 0 00.011-.717l-1.55-1.546-.708.707.694.694H24.01v.999H26.3l-.627.588.686.728zm-8.77 1.008a6.458 6.458 0 012.417-.467c.842 0 1.665.163 2.416.467-.669-1.771-.669-3.971 0-5.742-1.502.607-3.331.607-4.833 0 .669 1.77.669 3.97 0 5.742zm-1.944 1.98a.494.494 0 010-.707c1.94-1.936 1.94-6.352 0-8.289a.494.494 0 010-.706.502.502 0 01.709 0c.921.92 2.252 1.447 3.652 1.447 1.4 0 2.731-.528 3.653-1.447a.502.502 0 01.854.354c0 .128-.05.255-.146.352-1.942 1.937-1.942 6.353 0 8.29a.501.501 0 01-.708.706c-.922-.92-2.253-1.447-3.653-1.447s-2.731.527-3.652 1.447a.502.502 0 01-.709 0zm16.898-5.905a1.562 1.562 0 00-1.106-.456 1.558 1.558 0 00-1.105 2.662c.61.608 1.601.608 2.211 0a1.56 1.56 0 000-2.206zm.708 2.913a2.56 2.56 0 01-1.814.749 2.56 2.56 0 01-1.813-4.369c1-.997 2.628-.997 3.627 0 1 .999 1 2.622 0 3.62zM9.67 19.447a1.562 1.562 0 00-1.106-.456 1.56 1.56 0 00-1.105 2.662 1.56 1.56 0 102.21-2.206zm.708 2.912a2.56 2.56 0 01-1.814.749A2.559 2.559 0 016.75 18.74c1-.997 2.627-.997 3.627 0 1 .999 1 2.622 0 3.62zm17.057 6.551A10.514 10.514 0 0119.957 32a10.51 10.51 0 01-7.475-3.09c-1.316-1.312-2.074-2.44-2.537-3.774l-.947.327c.51 1.466 1.365 2.747 2.776 4.154A11.506 11.506 0 0019.957 33c3.093 0 6-1.201 8.185-3.383 1.14-1.139 2.279-2.43 2.87-4.156l-.948-.323c-.525 1.532-1.575 2.719-2.63 3.772zM9.945 15.86l-.947-.328c.512-1.467 1.368-2.749 2.778-4.156 4.51-4.5 11.85-4.502 16.362 0 1.08 1.077 2.266 2.414 2.874 4.156l-.948.328c-.54-1.55-1.635-2.78-2.634-3.777a10.508 10.508 0 00-7.473-3.087 10.508 10.508 0 00-7.472 3.087c-1.298 1.295-2.081 2.46-2.54 3.777z"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          ),
        },
        {
          name: "AWS Glue",
          icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ayzVM.png",
        },
      ],
    },
    {
      title: "Data Analytics",
      skills: [
        {
          name: "Power BI",
          icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
        },
        {
          name: "Airflow",
          icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T4KYAGteYxD6iutQkzk2W3S1mtdNSU.png",
        },
        {
          name: "Kafka",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        },
        {
          name: "PySpark",
          icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CgXKlKGvcZ5L1UfQt5JV1Yn8nAPuio.png",
        },
        {
          name: "REST APIs",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        },
        {
          name: "Pandas",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        },
        {
          name: "NumPy",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        },
        {
          name: "Matplotlib",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
        },
      ],
    },
    {
      title: "Infrastructure as Code",
      skills: [
        {
          name: "Terraform",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        },
        {
          name: "CloudFormation",
          icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NHc7U8TD28K48csu7eoNpxgBJOFsNh.png",
        },
        {
          name: "Ansible",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
        },
      ],
    },
    {
      title: "Other Tools & Software",
      skills: [
        {
          name: "Linux",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "GitHub",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
          name: "GitHub Actions",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "ServiceNow",
          icon: "/images/servicenow-logo.png",
        },
        {
          name: "Jira",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
        },
        {
          name: "Postman",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        },
        {
          name: "Boto3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-8 lg:px-16">
      <h2 className="text-5xl font-bold text-white mb-16">Skills</h2>

      <div className="space-y-12">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
              {category.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ml-7">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex flex-col items-center space-y-2 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 p-3">
                    {typeof skill.icon === "string" ? (
                      <img
                        src={skill.icon || "/placeholder.svg"}
                        alt={skill.name}
                        className="w-full h-full object-contain transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder.svg?height=40&width=40&query=" +
                            skill.name +
                            " icon";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {skill.icon}
                      </div>
                    )}
                  </div>
                  <span className="text-white/80 text-sm text-center group-hover:text-white transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Education section component
const EducationSection = () => {
  const education = [
    {
      institution: "State University of New York, Binghamton",
      degree: "Masters in Computer Science",
      field: "Thomas J Watson College of Engineering and Sciences",
      period: "Aug 2023 - Dec 2025",
      gpa: "GPA: 3.4",
      icon: "🎓",
    },
  ];

  return (
    <section
      id="education"
      className="min-h-screen py-20 px-8 lg:px-16 relative"
    >
      <h2 className="text-5xl font-bold text-white mb-16">Education</h2>

      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative w-96 h-96 flex items-center justify-center">
            <img
              src="/images/education-icon.png"
              alt="Education illustration with laptop and books"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="bg-black/40 border-white/10 p-6 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl">
                  {edu.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-300 mb-1">
                    {edu.institution}
                  </h3>
                  <p className="text-white font-semibold mb-1">{edu.degree}</p>
                  <p className="text-white/80 text-sm mb-1">{edu.field}</p>
                  <p className="text-white/60 text-sm mb-1">{edu.period}</p>
                  <p className="text-blue-300 text-sm">{edu.gpa}</p>
                </div>
              </div>
            </Card>
          ))}

          <Card className="bg-black/30 border-white/5 p-4 backdrop-blur-sm">
            <h4 className="text-lg font-semibold text-white mb-2">
              Relevant Coursework
            </h4>
            <p className="text-white/70 text-sm">
              Data Structures and Algorithms, Operating Systems, Artificial
              Intelligence, Machine Learning, Data Mining
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Projects section component
const ProjectsSection = () => {
  const projects = [
    {
      title: "Cloud Cost Optimization Toolkit",
      description:
        "Automated cost optimization tool using Boto3 and CloudWatch to identify idle AWS resources. Achieved 30-40% monthly cost reduction through automated lifecycle policies and cleanup routines.",
      techStack: ["Python", "AWS Lambda", "CloudWatch", "S3", "SNS"],
      icon: "💰",
      github: "#",
      demo: "#",
    },
    {
      title: "CI/CD Pipeline for Serverless Application",
      description:
        "Complete CI/CD pipeline using AWS CloudFormation with reusable YAML templates. Reduced deployment time from hours to minutes with automated testing and rollback capabilities.",
      techStack: ["CloudFormation", "CodePipeline", "Lambda", "API Gateway"],
      icon: "🚀",
      github: "#",
      demo: "#",
    },
    {
      title: "IoT Data Processing Architecture",
      description:
        "Designed IoT-based architecture processing 100K+ telemetry data points using REST APIs, enabling real-time asset monitoring and predictive analytics with 30% improved processing speed.",
      techStack: ["Python", "REST APIs", "IoT", "ServiceNow"],
      icon: "📡",
      github: "#",
      demo: "#",
    },
    {
      title: "ServiceNow ITSM Automation",
      description:
        "Streamlined IT Service Management operations by automating ticket triaging and resolution workflows, reducing SLA breaches by 40% through custom dashboards and flow templates.",
      techStack: ["ServiceNow", "Flow Designer", "REST APIs"],
      icon: "🎫",
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-8 lg:px-16">
      <h2 className="text-5xl font-bold text-white mb-16">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-black/40 border-white/10 p-6 backdrop-blur-sm hover:bg-black/50 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl">
                {project.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-blue-300"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-blue-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Contact section component
const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-8 lg:px-16 flex items-center"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8">Ameer Shaik</h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Automation is the art of translating complex systems into simple,
          repeatable processes.
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:text-blue-300"
          >
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:text-blue-300"
          >
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:text-blue-300"
          >
            <a href={LINKS.email} target="_blank" rel="noopener noreferrer">
              <Mail className="w-6 h-6" />
            </a>
          </Button>
        </div>

        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">
          Resume
        </Button>

        <div className="mt-16">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-x-hidden">
      <AnimatedParticles />
      <Navigation />

      <main>
        <HeroSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(-5px) rotate(240deg);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(10px) translateY(-10px);
          }
          50% {
            transform: translateX(-5px) translateY(-20px);
          }
          75% {
            transform: translateX(-10px) translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
