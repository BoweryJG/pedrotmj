import React, { useState } from 'react';

interface Symptom {
  id: string;
  label: string;
  description: string;
}

const symptoms: Symptom[] = [
  { id: 'jaw-pain', label: 'Jaw Pain', description: 'Pain or tenderness in jaw area' },
  { id: 'clicking', label: 'Clicking/Popping', description: 'Sounds when opening or closing mouth' },
  { id: 'lockjaw', label: 'Limited Movement', description: 'Difficulty opening mouth fully' },
  { id: 'headaches', label: 'Headaches', description: 'Frequent headaches or migraines' },
  { id: 'ear-pain', label: 'Ear Discomfort', description: 'Pain or fullness in ears' },
  { id: 'neck-pain', label: 'Neck/Shoulder Pain', description: 'Tension in neck and shoulders' },
  { id: 'teeth-grinding', label: 'Teeth Grinding', description: 'Grinding or clenching teeth' },
  { id: 'facial-pain', label: 'Facial Pain', description: 'Pain in face or temple area' }
];

const TMJSymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };

  const getSeverity = () => {
    if (selectedSymptoms.length >= 6) return { level: 'Severe', color: 'text-red-500' };
    if (selectedSymptoms.length >= 3) return { level: 'Moderate', color: 'text-yellow-400' };
    return { level: 'Mild', color: 'text-green-500' };
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            TMJ Symptom <span className="text-yellow-500">Checker</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your symptoms below for a personalized assessment and treatment recommendations
          </p>
        </div>

        {/* Symptom Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {symptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedSymptoms.includes(symptom.id)
                    ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black mb-1">{symptom.label}</h3>
                  <p className="text-sm text-gray-600">{symptom.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedSymptoms.length > 0
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-yellow-500/25'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Analyze Symptoms ({selectedSymptoms.length} selected)
          </button>
        </div>

        {/* Results Section */}
        {showResults && selectedSymptoms.length > 0 && (
          <div className="max-w-3xl mx-auto bg-black text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Your Assessment Results</h3>
            
            <div className="mb-8 text-center">
              <p className="text-gray-300 mb-2">Symptom Severity:</p>
              <p className={`text-4xl font-bold ${getSeverity().color}`}>
                {getSeverity().level}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Recommended Next Steps:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    Schedule a comprehensive TMJ evaluation
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    Begin tracking your symptoms daily
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    Consider immediate pain management techniques
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TMJSymptomChecker;