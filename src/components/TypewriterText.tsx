import { motion, usePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  messages: string[];
  typingSpeed?: number;
  delayBetweenMessages?: number;
}

export default function TypewriterText({ 
  messages, 
  typingSpeed = 30, 
  delayBetweenMessages = 1000 
}: Props) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) return;

    let currentIndex = 0;
    const message = messages[currentMessageIndex];
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setDisplayedText(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        if (currentMessageIndex < messages.length - 1) {
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedText('');
          }, delayBetweenMessages);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, messages, typingSpeed, delayBetweenMessages, isPresent]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: index === currentMessageIndex ? 1 : 0,
            y: index === currentMessageIndex ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
          className={`relative ${
            index === 0 
              ? 'text-4xl md:text-5xl font-bold tracking-tight' 
              : 'text-lg md:text-xl text-slate-300'
          }`}
        >
          {index === currentMessageIndex ? (
            <>
              <span>{displayedText}</span>
              <motion.span 
                className="inline-block w-1 h-5 ml-1 bg-white/70"
                animate={{ opacity: [1, 0] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
            </>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
} 