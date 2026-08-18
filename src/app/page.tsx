export const dynamic = 'force-dynamic';

import FeaturedProjects from '@/components/FeaturedProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Other sections */}
      <FeaturedProjects />
    </main>
  );
}