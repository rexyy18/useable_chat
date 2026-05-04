import { useState, FormEvent } from 'react';
import { SendHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="w-full glass rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-500 disabled:opacity-50"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || !message.trim()}
        className="absolute right-2 p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SendHorizontal size={20} />
      </motion.button>
    </form>
  );
}
