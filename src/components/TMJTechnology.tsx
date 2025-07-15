import React, { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
}

const technologies: Technology[] = [
  {
    id: 'cbct',
    name: '3D CBCT Imaging',
    description: 'Cone Beam Computed Tomography provides detailed 3D images of your jaw structure, enabling precise diagnosis and treatment planning.',
    benefits: [
      'Comprehensive jaw visualization',
      'Minimal radiation exposure',
      'Accurate joint assessment',
      'Real-time treatment planning'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'emg',
    name: 'EMG Analysis',
    description: 'Electromyography measures muscle activity patterns to identify dysfunction and guide targeted therapy approaches.',
    benefits: [
      'Muscle function assessment',
      'Objective pain measurement',
      'Treatment progress tracking',
      'Personalized therapy plans'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    )
  },
  {
    id: 'laser',
    name: 'Low-Level Laser Therapy',
    description: 'Advanced photobiomodulation technology accelerates healing, reduces inflammation, and provides pain relief.',
    benefits: [
      'Non-invasive treatment',
      'Accelerated tissue healing',
      'Reduced inflammation',
      'Immediate pain relief'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'biofeedback',
    name: 'Biofeedback Systems',
    description: 'Real-time monitoring and training systems help patients learn to control jaw muscle tension and improve function.',
    benefits: [
      'Self-regulation training',
      'Stress reduction techniques',
      'Habit modification',
      'Long-term management'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
];

const TMJTechnology: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('cbct');

  const selectedTechnology = technologies.find(tech => tech.id === selectedTech);

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Advanced <span className="text-yellow-400">Technology</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            State-of-the-art diagnostic and treatment technologies for optimal TMJ care
          </p>
        </div>

        {/* Technology Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Technology Selector */}
            <div className="space-y-4">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedTech === tech.id
                      ? 'border-yellow-400 bg-gray-900 shadow-lg shadow-yellow-400/20'
                      : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`mr-4 ${selectedTech === tech.id ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${
                        selectedTech === tech.id ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {tech.name}
                      </h3>
                      <p className="text-gray-400 mt-1 text-sm">{tech.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Technology Details */}
            {selectedTechnology && (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
                <div className="mb-6">
                  <div className="text-yellow-400 mb-4">{selectedTechnology.icon}</div>
                  <h3 className="text-3xl font-bold mb-4">{selectedTechnology.name}</h3>
                  <p className="text-gray-300 text-lg">{selectedTechnology.description}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-yellow-400">Key Benefits</h4>
                  <ul className="space-y-3">
                    {selectedTechnology.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
                    Learn More About {selectedTechnology.name}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <p className="text-gray-400">Diagnostic Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">45min</div>
            <p className="text-gray-400">Average Treatment Time</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">0</div>
            <p className="text-gray-400">Side Effects</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">FDA</div>
            <p className="text-gray-400">Approved Technologies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TMJTechnology;