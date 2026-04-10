import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />
      <div className="flex-1 max-w-[900px] w-full mx-auto px-6 py-32 lg:py-40 prose prose-invert prose-brand">
        {children}
      </div>
      <Footer />
    </div>
  );
}
