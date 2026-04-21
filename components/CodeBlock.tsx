'use client';

import { useEffect, useRef } from 'react';

export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && (window as any).Prism) {
      (window as any).Prism.highlightElement(ref.current);
    }
  }, [code]);

  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-3 py-1.5 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
      </div>
      <pre className="bg-gray-950 p-4 overflow-x-auto text-sm m-0">
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}