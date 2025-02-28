"use client"
import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bangs } from '../bang';

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
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40"></div>
        <div className="relative w-full h-full border-4 border-gray-400/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900">
          <div className="w-16 h-16 border-4 border-gray-400/20 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
