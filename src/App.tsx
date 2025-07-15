import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HelloWorld from './components/HelloWorld'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Vite + React + TypeScript + Tailwind
        </h1>
        
        <div className="max-w-md mx-auto mb-8">
          <HelloWorld name="React Developer" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-center text-gray-500 mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App