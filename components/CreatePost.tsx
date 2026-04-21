'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java',
  'cpp', 'go', 'rust', 'html', 'css', 'bash',
];

export default function CreatePost({ userImage }: { userImage?: string }) {
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        code: showCode ? code : null,
        language,
      }),
    });

    setContent('');
    setCode('');
    setShowCode(false);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="border border-gray-800 rounded-xl p-4 bg-gray-900 mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with developers..."
        rows={3}
        className="w-full bg-transparent text-white placeholder-gray-600 text-sm resize-none outline-none"
      />

      {showCode && (
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded border border-gray-700 outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            rows={6}
            className="w-full bg-gray-950 text-green-400 placeholder-gray-700 text-xs font-mono p-3 rounded-lg border border-gray-700 resize-none outline-none"
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
        <button
          onClick={() => setShowCode(!showCode)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
            showCode
              ? 'border-blue-500 text-blue-400 bg-blue-950'
              : 'border-gray-700 text-gray-400 hover:border-gray-500'
          }`}
        >
          {showCode ? 'Remove code' : '+ Add code snippet'}
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="text-xs font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}