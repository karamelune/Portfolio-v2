// components/SkillsCarousel.tsx
import React from 'react';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaSass,
  FaFigma,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiMongodb,
  SiMysql,
  SiGraphql,
  SiVite,
  SiReactrouter,
  SiSwagger,
  SiAxios,
} from 'react-icons/si';
import { IconType } from 'react-icons';

// Define tech categories with their respective colors
type TechCategory = 'frontend' | 'backend' | 'design' | 'tools';

interface CategoryStyle {
  bgColor: string;
  textColor: string;
}

interface TechItem {
  name: string;
  icon: IconType;
  category: TechCategory;
}

export default function SkillsCarousel(): React.ReactElement {
  // Category styling
  const categoryStyles: Record<TechCategory, CategoryStyle> = {
    frontend: { bgColor: 'bg-blue-900/50', textColor: 'text-blue-300' },
    backend: { bgColor: 'bg-purple-900/50', textColor: 'text-purple-300' },
    design: { bgColor: 'bg-green-900/50', textColor: 'text-green-300' },
    tools: { bgColor: 'bg-yellow-900/50', textColor: 'text-yellow-300' },
  };

  // Technologies with their categories
  const technologies: TechItem[] = [
    // Frontend
    { name: 'React', icon: FaReact, category: 'frontend' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
    { name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
    { name: 'JavaScript', icon: FaJs, category: 'frontend' },
    { name: 'HTML5', icon: FaHtml5, category: 'frontend' },
    { name: 'CSS3', icon: FaCss3Alt, category: 'frontend' },
    { name: 'React Router', icon: SiReactrouter, category: 'frontend' },
    { name: 'Redux', icon: SiRedux, category: 'frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend' },
    { name: 'Sass', icon: FaSass, category: 'frontend' },

    // Backend
    { name: 'MongoDB', icon: SiMongodb, category: 'backend' },
    { name: 'MySQL', icon: SiMysql, category: 'backend' },
    { name: 'GraphQL', icon: SiGraphql, category: 'backend' },
    { name: 'Swagger', icon: SiSwagger, category: 'backend' },

    // Design
    { name: 'Figma', icon: FaFigma, category: 'design' },

    // Tools
    { name: 'Git', icon: FaGitAlt, category: 'tools' },
    { name: 'Vite', icon: SiVite, category: 'tools' },
    { name: 'Axios', icon: SiAxios, category: 'tools' },
  ];

  // Split into two groups for opposing directions
  const firstHalf = technologies.slice(0, Math.ceil(technologies.length / 2));
  const secondHalf = technologies.slice(Math.ceil(technologies.length / 2));

  // Render a tech badge with appropriate styling
  const renderTechBadge = (tech: TechItem, key: string) => {
    const style = categoryStyles[tech.category];
    return (
      <div
        key={key}
        className={`ticker-item ${style.bgColor} ${style.textColor} py-2 px-3 rounded-lg 
                    flex items-center gap-2 transition-transform hover:scale-110 hover:shadow-lg 
                    cursor-pointer`}
      >
        <tech.icon className="text-lg" /> {tech.name}
      </div>
    );
  };

  return (
    <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-xl p-6 overflow-hidden">
      <div className="space-y-8">
        {/* First ticker - right to left */}
        <div className="marquee-container">
          <div className="marquee">
            <div className="marquee-content">
              {firstHalf.map((tech, index) =>
                renderTechBadge(tech, `tech1-${index}`),
              )}
            </div>
            <div className="marquee-content">
              {firstHalf.map((tech, index) =>
                renderTechBadge(tech, `tech1-dup-${index}`),
              )}
            </div>
          </div>
        </div>

        {/* Second ticker - left to right */}
        <div className="marquee-container">
          <div className="marquee marquee-reverse">
            <div className="marquee-content">
              {secondHalf.map((tech, index) =>
                renderTechBadge(tech, `tech2-${index}`),
              )}
            </div>
            <div className="marquee-content">
              {secondHalf.map((tech, index) =>
                renderTechBadge(tech, `tech2-dup-${index}`),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
