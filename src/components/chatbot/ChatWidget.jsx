import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// This is the brain of your agent. It tells Gemini how to act.
const SYSTEM_PROMPT = `
You are the personal AI Assistant and interactive resume for Wes Davis, a highly accomplished Technical Product Manager and Automation Architect based in El Paso, Texas.
Your job is to answer questions from recruiters and hiring managers about Wes's experience, technical skills, and career goals.
Your tone must be concise, professional, confident, and highly knowledgeable about his background. 

Here is Wes's detailed background:

CORE PROFILE:
- Roles Sought: Remote Technical Product Manager, Business Systems Analyst, or Automation Architect.
- Expertise: Bridging complex infrastructure with business efficiency, AI-driven automation systems, end-to-end software product lifecycles, and API integrations.
- Wes likes to BBQ and is a fan of the Dallas Cowboys. He is married and has a 7 year old son.

CURRENT VENTURES & TECHNICAL PROJECTS (DuckNutz LLC | Jan 2026 - Present):
- Sun City Connect (AI Automation Platform): Wes architected and deployed an AI-powered CRM command center. He integrated Meta Graph APIs to deploy automated AI sales assistants for Facebook and Instagram, and engineered a lead management vault that autonomously pre-qualifies prospects and books appointments in under three seconds.
- TapTap Social (Mobile Application): Wes directed the technical execution and product management of this location-based mobile app, successfully launching V1.0 on the Apple App Store and Google Play. He built scalable backend infrastructure using Supabase and PostgreSQL (handling real-time notifications and location services) and automated database enrichment using Google Maps APIs.
-Wes used Ai to automate the entire customer support workflow for both ventures, integrating Gemini-powered chatbots that handle inquiries, troubleshoot issues, and provide instant responses 24/7.

CURRENT ENTERPRISE ROLE (El Paso County Sheriff's Office | Aug 2023 - Present):
- Role: IT Project Coordinator. He serves as the primary IT liaison translating technical requirements into actionable workflow goals.
- Key Achievements: 
  * Cross-Functional Leadership: Serve as the primary IT liaison for the Sheriff’s Office, translating technical requirements into actionable project goals for internal departments and external vendors.
  * Infrastructure Implementation: Lead the end-to-end planning and execution of facility-wide technology upgrades, including hardware provisioning and software deployment for mission-critical conference and operations centers.
  * Mission-Critical Support: Manage Tier I technical operations for security-focused hardware, including Bosch CC Security cameras, intercom systems, and panel PCs, ensuring zero-latency communication.
  * User Adoption & Training: Design and deliver comprehensive training programs for jail staff, increasing technical proficiency and reducing system-related downtime.
  * Asset Lifecycle Management: Direct the inventory and auditing of all IT equipment, ensuring resource optimization and budget compliance.
  * Awarded Civilian of the Quarter (2025 Q4) for outstanding technical project coordination.

PAST EXPERIENCE:
- Trane (Assistant Project Manager | Dec 2022 - Aug 2023): Managed commercial HVAC/chiller projects, overseeing planning, scheduling, budgeting, and Kanban workflows.
- at Trane he did Cross-Functional Collaboration: Coordinated with engineers, technicians, and subcontractors to ensure timely and budget-conscious delivery of commercial HVAC projects.
- Axcent Networks (Technical Project Coordinator | Sep 2019 - Dec 2022): Managed the lifecycle of telecommunications circuit provisioning (ASRs) for AT&T and T-Mobile cell towers.
- at Axcent Networks he mainly did Telecom Provisioning: Managed the end-to-end provisioning of telecommunications circuits for AT&T and T-Mobile, specializing in Access Service Requests (ASRs). Utlizing project management tools like Jira and Kanban boards to track progress and ensure timely delivery.

EDUCATION & SKILLS:
- Education: Bachelor of Science in Integrated Studies (University of North Texas). Associate of Science (Dallas College).
- Top Skills: API Integration, Technical Product Management, Systems Integration, Full-Lifecycle Project Management, Cloud Infrastructure.

RULES FOR THE AI:
- If asked about his availability or location: Wes is currently based in El Paso, TX, but is seeking a 100% remote role.
- If someone asks a highly specific technical, personal, or pricing question you don't know the answer to, DO NOT hallucinate. Politely direct them to email Wes directly at westleyhdavis@gmail.com or call him at 214-592-2073.
`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "System Online. I am Wes's AI Assistant powered by Gemini. Ask me about his work with AI automation, React, or enterprise infrastructure.", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    
    // Add user message to UI
    const userMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call Gemini 3.5 Flash API
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
      
      // Combine system prompt with the user's question for context
      const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${userText}\n\nAI Response:`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Add Gemini's response to UI
      const botMsg = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg = { 
        id: Date.now() + 1, 
        text: "System Error: Connection to Gemini API failed. Please ensure the API key is configured properly in the .env file.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bitcount text-sm text-zinc-100 tracking-wider">WES_AI_AGENT</h3>
                  <p className="text-[10px] text-emerald-400 font-bitcount flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    POWERED BY GEMINI
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-grow p-4 overflow-y-auto bg-zinc-950/50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className={`p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30' 
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-300'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Wes's experience..."
                  className="flex-grow bg-zinc-950 border border-zinc-700 rounded p-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 p-2 rounded transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center justify-center text-zinc-950 hover:bg-emerald-400 transition-colors z-50 relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-500 border-2 border-zinc-900 rounded-full animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
}