import React from 'react';

interface HelloWorldProps {
  name?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name = 'World' }) => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Hello, {name}!</h2>
      <p className="mt-2">This component is styled with Tailwind CSS.</p>
    </div>
  );
};

export default HelloWorld;