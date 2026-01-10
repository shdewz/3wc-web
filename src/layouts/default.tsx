import { Footer } from '@components/footer';
import { Navbar } from '@components/navbar';

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-svh md:h-dvh">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex grow justify-center items-start pt-16 pb-[env(safe-area-inset-bottom)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
