import React from 'react';
import { Loader2, Dumbbell } from 'lucide-react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark flex flex-col justify-center items-center text-primary p-4">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-primary blur-lg opacity-50 rounded-full animate-pulse"></div>
        <Dumbbell size={40} className="relative text-white animate-bounce" />
      </div>
      <div className="flex items-center gap-2 text-white font-bold text-sm">
        <Loader2 className="w-4 h-4 animate-spin text-primary" /> Loading Fit-Zone Engine...
      </div>
    </div>
  );
};
