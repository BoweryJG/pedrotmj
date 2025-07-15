import React, { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  rating: number;
  quote: string;
  result: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 34,
    condition: 'Chronic Jaw Pain',
    rating: 5,
    quote: 'After years of suffering, I finally found relief. The personalized treatment plan changed my life completely.',
    result: 'Pain-free in 6 weeks',
    image: '/api/placeholder/80/80'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 42,
    condition: 'TMJ Clicking & Locking',
    rating: 5,
    quote: 'The advanced technology and expert care eliminated my jaw clicking. I can eat normally again!',
    result: '100% improvement in 8 weeks',
    image: '/api/placeholder/80/80'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 28,
    condition: 'Severe Headaches',
    rating: 5,
    quote: 'I didn\'t realize my headaches were TMJ-related. The treatment gave me my life back.',
    result: 'Headache-free in 4 weeks',
    image: '/api/placeholder/80/80'
  },
  {
    id: '4',
    name: 'David Thompson',
    age: 51,
    condition: 'Teeth Grinding',
    rating: 5,
    quote: 'The biofeedback therapy taught me how to stop grinding. My jaw pain is completely gone.',
    result: 'No more grinding after 3 weeks',
    image: '/api/placeholder/80/80'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    age: 39,
    condition: 'Limited Jaw Movement',
    rating: 5,
    quote: 'I couldn\'t open my mouth properly for months. Now I\'m back to normal thanks to the treatment.',
    result: 'Full range of motion restored',
    image: '/api/placeholder/80/80'
  },
  {
    id: '6',
    name: 'James Wilson',
    age: 45,
    condition: 'Facial Pain',
    rating: 5,
    quote: 'The comprehensive approach addressed all my symptoms. I\'m pain-free for the first time in years.',
    result: 'Complete pain relief in 5 weeks',
    image: '/api/placeholder/80/80'
  }
];

const TMJTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - 2)) % (testimonials.length - 2));
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Real <span className="text-yellow-500">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of patients who have found lasting relief from TMJ disorders
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === 1 ? 'md:scale-105 border-2 border-yellow-400' : ''
                }`}
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>

                {/* Result Badge */}
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block mb-6 text-sm font-semibold">
                  {testimonial.result}
                </div>

                {/* Patient Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold text-black">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-sm text-gray-600">{testimonial.condition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-black text-white rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">10,000+</div>
              <p className="text-gray-300">Patients Treated</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">95%</div>
              <p className="text-gray-300">Success Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">4.9/5</div>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">30+</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 mb-6">Ready to write your own success story?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default TMJTestimonials;