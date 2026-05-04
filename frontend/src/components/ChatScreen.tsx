import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export type ModuleType = 'mental' | 'health' | 'nutrition';

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

interface ChatScreenProps {
  module: ModuleType;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (content: string) => void;
  isTyping?: boolean;
}

const moduleConfig = {
  mental: {
    title: 'Mental Health Assistant',
    description: 'Mindful support for your emotional wellbeing.',
    color: 'emerald',
  },
  health: {
    title: 'Physical Health Guide',
    description: 'Expert advice for your physical activity and recovery.',
    color: 'blue',
  },
  nutrition: {
    title: 'Nutrition Expert',
    description: 'Personalized guidance for a balanced diet.',
    color: 'orange',
  },
};

export default function ChatScreen({
  module,
  messages,
  onBack,
  onSendMessage,
  isTyping,
}: ChatScreenProps) {
  const config = moduleConfig[module];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 rounded-xl glass glass-hover"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="font-display font-bold text-xl md:text-2xl flex items-center gap-2">
              {config.title}
              <Sparkles size={16} className="text-emerald-400 animate-pulse" />
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm">{config.description}</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mb-6 scrollbar-hide space-y-4">
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-zinc-500 text-center space-y-4"
            >
              <div className="p-4 rounded-full bg-zinc-900/50 border border-zinc-800">
                <Sparkles size={32} />
              </div>
              <p className="max-w-[200px] text-sm italic">
                Start the conversation by typing a message below.
              </p>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                content={msg.content}
                isAi={msg.isAi}
                timestamp={msg.timestamp}
              />
            ))
          )}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="glass rounded-2xl rounded-bl-none p-4 flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <footer className="mt-auto pb-4">
        <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
        <p className="text-[10px] text-center text-zinc-600 mt-4 uppercase tracking-widest">
          Secure AI Conversation • MindTrack AI
        </p>
      </footer>
    </div>
  );
}
