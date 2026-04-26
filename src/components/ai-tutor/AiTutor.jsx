import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const SIMULATED_RESPONSES = [
  "That's a great question! Let me break it down for you. The key idea here is that complex systems often have emergent properties — behaviours that arise from the interaction of simpler components, but cannot be predicted from those components alone.",
  "I love your curiosity! Think of it this way: every subject is like a different lens on the same reality. When you combine lenses — say, economics and psychology — you start seeing patterns that neither field can explain on its own.",
  "Excellent thinking. The short answer is that there isn't one single cause — it's a web of interconnected factors. Let me walk you through the three most important ones...",
  "You're on the right track. To deepen your understanding, I'd suggest focusing on the core principle first, then exploring how it applies in different contexts. Shall I generate a quick quiz to test your grasp?",
];

export default function AiTutor({ subtopicName = null, buttonBottom = 'bottom-6' }) {
  const getInitialMessage = () => {
    if (subtopicName) {
      return `I can see you're studying ${subtopicName}. What would you like me to explain or clarify?`;
    }
    return "Hello. I'm your Nexus tutor — here to help you think through any idea you're studying. Ask me anything, however simple or complex.";
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [{ role: 'assistant', content: getInitialMessage() }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = SIMULATED_RESPONSES[Math.floor(Math.random() * SIMULATED_RESPONSES.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          `fixed ${buttonBottom} right-6 z-40 w-14 h-14 rounded-full bg-sidebar text-sidebar-foreground shadow-editorial-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ring-1 ring-primary/30`,
          isOpen && "scale-0 opacity-0"
        )}
      >
        <Sparkles className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-card shadow-2xl flex flex-col"
          >
            {/* Navy header */}
            <div className="flex items-center justify-between px-6 py-5 bg-sidebar text-sidebar-foreground">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sidebar-accent flex items-center justify-center ring-1 ring-primary/40">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold leading-tight">AI Tutor</h3>
                  <p className="text-[11px] text-sidebar-foreground/60 uppercase tracking-[0.14em] mt-0.5">
                    Always considered
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-md flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-background">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed",
                    msg.role === 'user'
                      ? "bg-sidebar text-sidebar-foreground rounded-br-sm"
                      : "bg-card shadow-editorial text-foreground rounded-bl-sm font-serif"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card shadow-editorial rounded-2xl px-4 py-3.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-5 py-4 border-t border-border bg-card">
              <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-4 py-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-9 w-9 rounded-lg shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2.5 text-center uppercase tracking-[0.14em]">
                Powered by Nexus Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}