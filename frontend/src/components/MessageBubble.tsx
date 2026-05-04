import { motion } from 'motion/react';

interface MessageBubbleProps {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

export default function MessageBubble({ content, isAi, timestamp }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isAi
            ? 'glass text-zinc-100 rounded-bl-none'
            : 'bg-emerald-600/90 text-white shadow-lg shadow-emerald-900/20 rounded-br-none'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed">{content}</p>
        <div
          className={`text-[10px] mt-2 opacity-50 ${
            isAi ? 'text-zinc-400' : 'text-zinc-100'
          }`}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}
