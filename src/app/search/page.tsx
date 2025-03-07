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
    let searchUrl;

    const query = q;
    const match = query.match(/!(\S+)/i);
    const bangCandidate = match?.[1]?.toLowerCase();

    // Get default engine directly from localStorage or use 'g' as fallback
    const defaultEngine = localStorage.getItem('defaultEngine') || 'g';

    // If bang is provided in search, use it; otherwise use default engine
    const defaultBang = bangs.find(b => b.t === defaultEngine) || bangs.find(b => b.t === 'g') || bangs[0];
    const selectedBang = bangCandidate ? (bangs.find(b => b.t === bangCandidate) || defaultBang) : defaultBang;

    const cleanQuery = query.replace(/!\S+\s*/i, '').trim();
    if (cleanQuery === "") {
      searchUrl = "https://" + selectedBang.d;
    } else {
      searchUrl = selectedBang.u.replace('{{{s}}}', encodeURIComponent(cleanQuery).replace(/%2F/g, "/"));
    }

    if (searchUrl) {
      router.replace(searchUrl);
    }
  }, [q, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-25 blur group-hover:opacity-40"></div>
        <div className="relative w-full h-full rounded-full border-4 animate-spin border-gray-400/20 border-t-purple-500"></div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900">
          <div className="w-16 h-16 rounded-full border-4 animate-spin border-gray-400/20 border-t-purple-500"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
