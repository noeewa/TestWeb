import React, { useEffect, useState } from "react"
import { Loader2 } from "lucide-react";

export const Loader: React.FC<{}> = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Initializing...");
    const messages = ["Loading assets...","Almost there...", "Ready!"];
    let messageIndex = 0;

  // Only run loading animation on initial app load (at root path)
  const isInitialLoad = location.pathname === "/";
    useEffect(() => {
        if (!isInitialLoad) {
            setIsLoading(false);
            return;
          }
          
          setIsLoading(true);
    }, [])
    return(
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
            <p className="absolute bottom-20 text-sm opacity-40">{loadingText}</p>
        </div>
    )    
}
