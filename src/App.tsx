import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MindscapeWithSidebar from "./components/MindscapeWithSidebar";
import MindscapeTechnical from "./pages/MindscapeTechnical";
import MindscapeCreative from "./pages/MindscapeCreative";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Mindscape from "./pages/Mindscape";

const queryClient = new QueryClient();

const App: React.FC<{}> = ({}) => {
  const [posisi, setPosisi] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...")
    const messages = ["Loading assets...", "Optimizing experience...", "Almost there...", "Ready!"]
    let messageIndex = 0
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
      setLoading(true); // Set loading to true initially
      const interval = setInterval(() => {
    if (messageIndex < messages.length - 1) {
      setLoadingText(messages[messageIndex])
      messageIndex++
    } else {
      clearInterval(interval)
      // Simulate a final delay before hiding the loading screen
      setTimeout(() => {
        setLoading(false); // Set loading to false when done
      }, 500) // Short delay after "Ready!"
    }
  }, 1000) // Change text every 1 second
   // Simulate overall loading time
  const totalLoadingTime = messages.length * 1000 + 500 // Total time for messages + final delay
  const timeout = setTimeout(() => {
    clearInterval(interval) // Ensure interval is cleared if loading finishes early
    setLoading(false); // Set loading to false when done
  }, totalLoadingTime)
  return () => {
    clearInterval(interval)
    clearTimeout(timeout)
  }
  }, []);
  const Loader = () => {
          return(
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <Loader2 className="h-12 w-12 animate-spin text-gray-400" /> {/* Centered grey circle */}
          <p className="absolute bottom-20 text-sm opacity-40">{loadingText}</p> {/* Text at middle-bottom */}
          </div>
          );
  }
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Layout>
          <Routes>
              <Route path="/" element={isLoading? (<Loader/> ) : (<Home posisi={posisi} setPosisi={setPosisi} />)} />
              <Route path="/mindscape" element={<MindscapeWithSidebar />} > {/* Tambahan */}
                <Route path="" element={<Mindscape />} /> {/* Tambahan */}
                <Route path="pre-fase" element={<MindscapeTechnical />} /> {/* Tambahan */}
              </Route>
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */} 
          </Routes>
          </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
