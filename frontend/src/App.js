import "@/App.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Product from "@/pages/Product";
import Advisory from "@/pages/Advisory";
import Operators from "@/pages/Operators";
import Engagement from "@/pages/Engagement";
import Industry from "@/pages/Industry";
import ManifestoPage from "@/pages/ManifestoPage";
import Pricing from "@/pages/Pricing";
import TestimonialsPage from "@/pages/TestimonialsPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <HelmetProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/industries/:slug" element={<Industry />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors closeButton />
    </div>
    </HelmetProvider>
  );
}

export default App;
