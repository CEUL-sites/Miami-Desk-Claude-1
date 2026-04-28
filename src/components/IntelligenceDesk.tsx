import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function IntelligenceDesk() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Good morning. I'm the Intelligence Desk for Carlos Uzcategui's office. I can answer market questions, begin a listing intake, or connect you with the referral desk — in Spanish, English, or Portuguese. How may I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const CHIPS = [
    "Price per sqft · Brickell",
    "Activate listing in MLS",
    "Referral terms"
  ];

  async function handleSend(overrideInput?: string) {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-desk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) })
      });
      
      const data = await res.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "The Intelligence Desk is currently unavailable. Please try again in a few minutes." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "The Intelligence Desk is currently unavailable. Please try again in a few minutes." }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <section id="intelligence" className="bg-white py-28 px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      <div className="flex flex-col justify-start">
        <p className="section-label">AI Intelligence Desk</p>
        <h2 className="text-navy text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-6">
           Powered by <em className="italic text-gold">Gemini.</em> <br />
           Trained on 25 years.
        </h2>
        <p className="text-muted text-sm md:text-base leading-[1.85] mb-6 font-light max-w-lg">
          Not a FAQ bot. A real-time institutional AI — fluent in Spanish, English, and Portuguese, available 24/7, pre-trained on Carlos's market knowledge and current South Florida pricing.
        </p>
        <ul className="space-y-4 mb-4">
           {[
             "Current conditions in any South Florida zone",
             "Comparative pricing: Miami vs Madrid vs LATAM",
             "Referral desk: begin a B2B conversation",
             "Listing intake: start your activation request",
             "Buyer mandate: describe your mandate"
           ].map(item => (
             <li key={item} className="flex items-center gap-4 text-xs font-light text-slate border-b border-line pb-3 last:border-none">
                <div className="w-1 h-1 bg-gold rounded-full shrink-0" />
                {item}
             </li>
           ))}
        </ul>
      </div>

      <div className="flex flex-col bg-white border border-navy/10 h-[600px] shadow-3xl relative overflow-hidden group">
        {/* Header - Terminal Style */}
        <div className="bg-navy py-3 px-6 flex items-center justify-between border-b border-gold/20">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-gold-light rounded-full animate-pulse" />
              <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold-light">System: Institutional Intelligence Engine v2.0</span>
           </div>
           <span className="font-mono text-[8px] text-white/30 tracking-[1px]">LATENCY: 12MS · BILINGUAL: ACTIVE</span>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-white-pure scroll-smooth"
        >
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col",
                m.role === "user" ? "items-end" : "items-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-5 text-[0.85rem] leading-[1.8] font-light transition-all",
                m.role === "user" 
                  ? "bg-navy text-white/90 border border-navy" 
                  : "bg-bone-dark text-slate border border-line-light"
              )}>
                {m.role === "assistant" && (
                   <span className="font-mono text-[8px] tracking-[3px] uppercase text-gold block mb-3 border-b border-gold/10 pb-2">Analysis Hub</span>
                )}
                {m.content}
              </div>
              <span className="font-mono text-[7px] text-muted/40 mt-2 tracking-[1px]">
                {m.role === "user" ? "MANDATE_INQUIRY" : "AI_SYNTHESIS"} · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-1.5 p-5 bg-bone-dark border border-line-light w-fit">
               <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
               <div className="w-1 h-1 bg-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
               <div className="w-1 h-1 bg-gold rounded-full animate-bounce" />
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 px-8 py-4 border-t border-line-light bg-bone/30">
           {CHIPS.map(chip => (
             <button 
              key={chip} 
              onClick={() => handleSend(chip)}
              className="font-mono text-[8.5px] tracking-[2px] uppercase text-navy/40 py-2 px-4 border border-line-light bg-white transition-all hover:border-gold hover:text-gold hover:shadow-sm"
            >
               {chip}
             </button>
           ))}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-navy/5 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your mandate or ask for market data…"
            className="flex-1 bg-bone/50 border border-line-light text-[0.85rem] font-light px-5 py-4 focus:border-gold outline-none transition-all placeholder:text-muted/40"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isTyping}
            className="btn-gold !px-8 !py-0 h-full flex items-center justify-center"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
