import { useState, useCallback, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ChatScreen, { ModuleType } from "./components/ChatScreen";

interface Message {
  id: string;
  content: string;
  isAi: boolean;
  timestamp: Date;
}

type Screen = "dashboard" | "chat";

// const AIDefaultResponses: Record<ModuleType, string> = {
//   mental:
//     "That sounds like a lot. Do you want to talk about it? I'm here to listen and help you navigate these feelings.",
//   health:
//     "Physical activity is key! How many hours do you typically sleep daily? Understanding your rest patterns is the first step to improving performance.",
//   nutrition:
//     "Proper fuel makes all the difference. Can you tell me about your daily meals? I can help you optimize your intake for better energy.",
// };

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [messages, setMessages] = useState<Record<ModuleType, Message[]>>({
    mental: [],
    health: [],
    nutrition: [],
  });
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectModule = (module: ModuleType) => {
    setActiveModule(module);
    setScreen("chat");
  };

  const handleBack = () => {
    setScreen("dashboard");
    setActiveModule(null);
  };

  //

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!activeModule) return;

      const newUserMessage: Message = {
        id: Date.now().toString(),
        content,
        isAi: false,
        timestamp: new Date(),
      };

      // show user message
      setMessages((prev) => ({
        ...prev,
        [activeModule]: [...prev[activeModule], newUserMessage],
      }));

      setIsTyping(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content,
            mode: activeModule,
          }),
        });

        const data = await response.json();

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.reply,
          isAi: true,
          timestamp: new Date(),
        };

        setMessages((prev) => ({
          ...prev,
          [activeModule]: [...prev[activeModule], aiResponse],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsTyping(false);
      }
    },
    [activeModule],
  );

  return (
    <main className="min-h-screen selection:bg-emerald-500/30">
      {screen === "dashboard" ? (
        <Dashboard onSelectModule={handleSelectModule} />
      ) : activeModule ? (
        <ChatScreen
          module={activeModule}
          messages={messages[activeModule]}
          onBack={handleBack}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
        />
      ) : null}
    </main>
  );
}
