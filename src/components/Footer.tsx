import React from 'react';

export default function Footer() {
  const cdpDocs = [
    {
      name: 'Segment',
      url: 'https://segment.com/docs/?ref=nav',
    },
    {
      name: 'mParticle',
      url: 'https://docs.mparticle.com/',
    },
    {
      name: 'Lytics',
      url: 'https://docs.lytics.com/',
    },
    {
      name: 'Zeotap',
      url: 'https://docs.zeotap.com/home/en-us/',
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
          {cdpDocs.map((doc) => (
            <a
              key={doc.name}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm md:text-base"
            >
              {doc.name} Docs
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}