"use client"
import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bangs } from './bang';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  useEffect(() => {
    if (!q) return;

    const query = q;
    const match = query.match(/!(\S+)/i);
    const bangCandidate = match?.[1]?.toLowerCase();
    const defaultBang = bangs.find(b => b.t === 'g') || bangs[0];
    const selectedBang = bangs.find(b => b.t === bangCandidate) || defaultBang;
    const cleanQuery = query.replace(/!\S+\s*/i, '').trim();
    const searchUrl = selectedBang.u.replace('{{{s}}}', encodeURIComponent(cleanQuery));

    if (searchUrl) {
      router.replace(searchUrl);
    }
  }, [q, router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-gray-400 text-lg font-medium">Redirecting...</p>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
