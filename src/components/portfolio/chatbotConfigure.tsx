"use client"
import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';

interface VapiWidgetProps {
  apiKey: string;
  assistantId: string;
  config?: Record<string, unknown>;
}

const Waveform = ({ active }: { active: boolean }) => (
  <div className="flex items-end gap-1 h-6">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded bg-primary"
        animate={active ? { height: [8, 24, 12, 20, 8][i % 5] } : { height: 8 }}
        transition={{
          repeat: Infinity,
          duration: 0.7 + i * 0.05,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: i * 0.07,
        }}
        style={{ height: 8 }}
      />
    ))}
  </div>
);

const SpeakingIndicator = ({ speaking }: { speaking: boolean }) => (
  <div className="flex items-center gap-1 ml-2">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block w-2 h-2 rounded-full bg-primary"
        animate={speaking ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          repeatType: 'loop',
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

// Refactor ChatBubble to forward ref
const ChatBubble = React.forwardRef<HTMLDivElement, { text: string; role: string }>(
  ({ text, role }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md mb-2 text-sm break-words
        ${role === 'user'
          ? 'bg-gradient-to-br from-primary to-primary/80 text-white self-end'
          : 'bg-card/80 text-foreground self-start border border-border'}
      `}
    >
      {text}
    </motion.div>
  )
);
ChatBubble.displayName = 'ChatBubble';

const LoadingDots = () => (
  <div className="flex items-center gap-1 mt-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block w-2 h-2 rounded-full bg-muted-foreground"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          repeatType: 'loop',
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

const VapiWidget: React.FC<VapiWidgetProps> = ({ 
  apiKey, 
  assistantId, 
  config = {} 
}) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsConnected(true);
      setIsThinking(false);
    });

    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsSpeaking(false);
      setIsThinking(false);
    });

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true);
      setIsThinking(false);
    });

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 1200); // Simulate short thinking
    });

    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript') {
        setTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript
        }]);
      }
    });

    vapiInstance.on('error', (error) => {
      setIsThinking(false);
      setIsSpeaking(false);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  const startCall = () => {
    if (vapi) {
      setTranscript([]);
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div className="fixed bottom-6 right-10 z-50 font-sans max-w-full flex flex-col items-center">
      {/* Label above mic button */}
      {!isConnected && (
        <div className="mb-2 text-center text-base md:text-lg font-semibold text-foreground/90 drop-shadow-sm select-none">
          Talk to my Assistant
        </div>
      )}
      {/* Floating Mic Button */}
      {!isConnected && (
        <motion.button
          onClick={startCall}
          className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-xl hover:scale-105 transition-transform border-4 border-background"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(139,92,246,0.5)',
                '0 0 0 12px rgba(139,92,246,0.0)',
                '0 0 0 0 rgba(139,92,246,0.5)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          >
            <Mic className="w-8 h-8 text-white" />
          </motion.div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="w-[90vw] max-w-sm md:max-w-md bg-gradient-to-br from-background/90 to-background/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-border p-4 md:p-6 flex flex-col gap-2 md:gap-4"
            style={{ minHeight: 420 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}
                  animate={isSpeaking ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                />
                <span className="font-semibold text-foreground text-base md:text-lg">
                  {isSpeaking ? 'Assistant Speaking' : isThinking ? 'Thinking...' : 'Listening...'}
                </span>
                {isSpeaking && <SpeakingIndicator speaking={isSpeaking} />}
                {isThinking && <LoadingDots />}
              </div>
              <button
                onClick={endCall}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-destructive text-white hover:bg-destructive/80 text-xs font-medium shadow"
              >
                <X className="w-4 h-4" /> End
              </button>
            </div>

            {/* Waveform Animation */}
            <div className="flex justify-center mb-2 min-h-[28px]">
              <Waveform active={isSpeaking || isThinking} />
            </div>

            {/* Chat Bubbles */}
            <div className="flex flex-col gap-1 md:gap-2 overflow-y-auto flex-1 max-h-64 md:max-h-80 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent pr-1">
              {transcript.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground text-sm text-center mt-8"
                >
                  Conversation will appear here...
                </motion.p>
              ) : (
                <AnimatePresence initial={false}>
                  {transcript.map((msg, i) => (
                    <ChatBubble
                      key={i}
                      text={msg.text}
                      role={msg.role}
                      ref={i === transcript.length - 1 ? lastMessageRef : undefined}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export  {VapiWidget};

