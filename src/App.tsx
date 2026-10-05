import React, { useState, useCallback } from 'react';
import { MotionConfig, AnimatePresence } from 'motion/react';
import { World } from './components/World';
import { PlainMode } from './components/PlainMode';
import { BootLoadingScreen } from './components/Intro/BootLoadingScreen';
import { PressStartIntro } from './components/Intro/PressStartIntro';
import { useGameStore } from './store/useGameStore';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isPlainMode, hasGameStarted } = useGameStore();

  const handleCompleteLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleLaunchComplete = useCallback(() => {
    // Mission launched
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-screen h-screen overflow-hidden bg-[#090714] text-[#f5f6ff] select-none">
        {/* Accessible Plain HTML Mode */}
        {isPlainMode ? (
          <PlainMode />
        ) : (
          <>
            {/* The Main 2D Galaxy Universe */}
            <World />

            {/* Retro Boot Loading Screen */}
            <AnimatePresence>
              {isLoading && (
                <BootLoadingScreen onComplete={handleCompleteLoading} />
              )}
            </AnimatePresence>

            {/* Arcade Title Screen & Countdown */}
            <AnimatePresence>
              {!isLoading && !hasGameStarted && (
                <PressStartIntro onLaunchComplete={handleLaunchComplete} />
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </MotionConfig>
  );
};

export default App;
