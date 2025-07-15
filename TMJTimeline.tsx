import React from 'react';

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
}

const timelineSteps: TimelineStep[] = [
  {
    number: '01',
    title: 'Comprehensive Assessment',
    description: 'Advanced 3D imaging and biomechanical analysis to identify the root cause of your TMJ disorder',
    duration: '60-90 minutes',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Personalized Treatment Plan',
    description: 'Custom-designed therapy combining manual techniques, exercises, and cutting-edge technology',
    duration: '2-4 weeks',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Lasting Relief & Prevention',
    description: 'Ongoing support and maintenance strategies to ensure long-term jaw health and comfort',
    duration: 'Lifetime support',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const TMJTimeline: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Your Journey to <span className="text-yellow-500">Relief</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven 3-step process designed to eliminate TMJ pain and restore your quality of life
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-gray-400 to-yellow-400 hidden md:block" />

            {/* Timeline Steps */}
            <div className="space-y-12 md:space-y-24">
              {timelineSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Step Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-400 text-black p-3 rounded-full mr-4">
                          {step.icon}
                        </div>
                        <div>
                          <span className="text-4xl font-bold text-gray-200">{step.number}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-500">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="w-full md:w-2/12 flex justify-center my-8 md:my-0">
                    <div className="relative">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.number}
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-yellow-400 rounded-full animate-ping opacity-25" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 mb-8">
            Ready to start your journey to a pain-free life?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
            Begin Your Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default TMJTimeline;