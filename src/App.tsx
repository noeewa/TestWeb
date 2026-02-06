import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NavigatorBar from "./components/NavigatorBar";
import MindscapeTechnical from "./pages/MindscapeTechnical";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Mindscape from "./pages/Mindscape";
import MindscapeDBPage from "./pages/MindscapeDBPage";
import Lobby from "./pages/Lobby";

const queryClient = new QueryClient();

const App: React.FC<{}> = ({}) => {
    const [posisi, setPosisi] = useState(0);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<Home posisi={posisi} setPosisi={setPosisi} />} />
                <Route path="mindscape" element={<NavigatorBar />} >
                  <Route index element={<Lobby />} />
                  <Route path="personal" element={<Mindscape />} />
                  <Route path="pre-fase" element={<MindscapeTechnical />} />
                  <Route path="page/:id" element={<MindscapeDBPage />} />
                </Route>
                <Route path="gallery" element={<NavigatorBar />} >
                  <Route index element={<Gallery />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
