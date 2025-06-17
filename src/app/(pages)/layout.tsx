import Navigation from '@/components/Navigation';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        {children}
      </main>
      <footer className="mt-auto py-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <SocialLinks />
          <Footer />
        </div>
      </footer>
    </div>
  );
}
