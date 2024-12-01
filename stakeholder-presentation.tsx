import React, { useState } from 'react';
import { ArrowRight, Clock, Users, Building, Shield, Code, Database } from 'lucide-react';

const StakeholderPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "World Equity X",
      subtitle: "Strategic Implementation Overview",
      type: "cover",
      content: {
        date: "November 2024",
        presenter: "Technical Implementation Team"
      }
    },
    {
      title: "Project Scope",
      type: "content",
      content: {
        mainPoints: [
          {
            title: "Trading Platform Core",
            description: "Secure peer-to-peer tokenized equities exchange",
            icon: <Building className="w-6 h-6 text-blue-500" />
          },
          {
            title: "Advanced Infrastructure",
            description: "High-performance, scalable technical architecture",
            icon: <Database className="w-6 h-6 text-green-500" />
          },
          {
            title: "Security Framework",
            description: "Multi-layer security and compliance system",
            icon: <Shield className="w-6 h-6 text-red-500" />
          }
        ]
      }
    },
    {
      title: "Implementation Requirements",
      type: "content",
      content: {
        timeline: "18-24 months",
        team: {
          core: 15,
          extended: 25,
          specialties: [
            "Smart Contract Development",
            "Security Engineering",
            "System Architecture",
            "Financial Systems Integration"
          ]
        },
        infrastructure: {
          development: "$400K-500K annually",
          production: "$800K-1M annually",
          security: "$300K-400K annually"
        }
      }
    },
    {
      title: "Development Phases",
      type: "timeline",
      content: {
        phases: [
          {
            name: "Foundation",
            duration: "4-5 months",
            key: "Core infrastructure and security framework"
          },
          {
            name: "Core Development",
            duration: "6-7 months",
            key: "Trading engine and smart contracts"
          },
          {
            name: "Integration",
            duration: "4-5 months",
            key: "System integration and testing"
          },
          {
            name: "Launch Preparation",
            duration: "2-3 months",
            key: "Final testing and deployment"
          }
        ]
      }
    },
    {
      title: "Resource Investment",
      type: "metrics",
      content: {
        developmental: {
          title: "Development Team",
          items: [
            "Smart Contract Specialists",
            "Backend Engineers",
            "Security Experts",
            "System Architects"
          ]
        },
        operational: {
          title: "Infrastructure",
          items: [
            "High-performance servers",
            "Security systems",
            "Monitoring tools",
            "Backup systems"
          ]
        },
        compliance: {
          title: "Compliance & Security",
          items: [
            "Security audits",
            "Compliance frameworks",
            "Legal consultation",
            "Risk management"
          ]
        }
      }
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      {slides[currentSlide].type === "cover" ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
          <h2 className="text-2xl text-gray-600 mb-12">{slides[currentSlide].subtitle}</h2>
          <div className="text-gray-500">
            <p>{slides[currentSlide].content.date}</p>
            <p>{slides[currentSlide].content.presenter}</p>
          </div>
        </div>
      ) : slides[currentSlide].type === "content" ? (
        <div className="min-h-screen">
          <h2 className="text-3xl font-bold mb-12">{slides[currentSlide].title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slides[currentSlide].content.mainPoints?.map((point, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {point.icon}
                  <h3 className="text-xl font-semibold ml-3">{point.title}</h3>
                </div>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : slides[currentSlide].type === "timeline" ? (
        <div className="min-h-screen">
          <h2 className="text-3xl font-bold mb-12">{slides[currentSlide].title}</h2>
          <div className="space-y-8">
            {slides[currentSlide].content.phases.map((phase, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-500 rounded-full p-2 mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{phase.name}</h3>
                  <p className="text-gray-600">{phase.duration}</p>
                  <p className="text-gray-500 mt-2">{phase.key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : slides[currentSlide].type === "metrics" ? (
        <div className="min-h-screen">
          <h2 className="text-3xl font-bold mb-12">{slides[currentSlide].title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(slides[currentSlide].content).map(([key, section]) => (
              <div key={key} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      
      <div className="fixed bottom-8 right-8 flex space-x-4">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          className="px-4 py-2 bg-gray-200 rounded-lg"
          disabled={currentSlide === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          disabled={currentSlide === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StakeholderPresentation;
