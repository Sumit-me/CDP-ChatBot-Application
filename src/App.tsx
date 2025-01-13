import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import CDPSelector from './components/CDPSelector';
import Footer from './components/Footer';
import { CDP } from './types';
import { setApiKey } from './utils/api';

function App() {
  const [selectedCDP, setSelectedCDP] = useState<CDP>('all');

  const handleApiKeyUpdate = (newKey: string) => {
    setApiKey(newKey);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onApiKeyUpdate={handleApiKeyUpdate} />
      <main className="flex-1 flex flex-col">
        <CDPSelector selectedCDP={selectedCDP} onSelect={setSelectedCDP} />
        <ChatInterface selectedCDP={selectedCDP} />
      </main>
      <Footer />
    </div>
  );
}

export default App;