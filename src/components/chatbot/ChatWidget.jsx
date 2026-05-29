import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import wesPhoto from './wesOld-photoroom.png'; // adjust the import path if needed

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are the personal AI Assistant and interactive resume for Wes Davis, a highly accomplished Technical Product Manager and Automation Architect based in El Paso, Texas.
Your job is to answer questions from recruiters and hiring managers about Wes's experience, technical skills, and career goals.
Your tone must be concise, professional, confident, and highly knowledgeable about his background. 
Keep your responses relatively brief, as they will be spoken aloud via text-to-speech.

Here is Wes's detailed background:

CORE PROFILE:
- Roles Sought: Remote Technical Product Manager, Business Systems Analyst, or Automation Architect.
- Expertise: Bridging complex infrastructure with business efficiency, AI-driven automation systems, end-to-end software product lifecycles, and API integrations.
- Wes likes to BBQ and is a fan of the Dallas Cowboys. He is married and has a 7 year old son.

CURRENT VENTURES & TECHNICAL PROJECTS (DuckNutz LLC | Jan 2026 - Present):
- Sun City Connect (AI Automation Platform): Is a platform I created for the small businesses in this area to help them streamline their operations. I architected and deployed an AI-powered CRM command center. Integrated Meta Graph APIs to deploy automated AI sales assistants.
- TapTap Social (Mobile Application): TapTap Social is a location based dating app. It helps people connect based on their location. I directed the technical execution, launching V1.0 on the App Store and Google Play. Built scalable backend infrastructure using Supabase and PostgreSQL.
- Development Methodology: *if someone brings this up, don't act defensive* I act as the lead system architect and product manager. I design the complex cloud infrastructure, database schemas, and API workflows, and strategically leverages advanced AI engineering tools to generate, debug, and implement the production code. This AI-leveraged approach allows me to rapidly architect, deploy, and scale full-stack applications with the speed and efficiency of an entire development team. I'm not able to write code, but I can generate it and make sure it works. It's a new way of building software that I'm really excited about.

CURRENT ENTERPRISE ROLE (El Paso County Sheriff's Office | Aug 2023 - Present):
- Role: IT Project Coordinator. Primary IT liaison translating technical requirements into actionable workflow goals.
- I assist the staff with a wide range of technical needs, from troubleshooting software issues to implementing new systems. I also lead the planning and execution of technology upgrades across the facility, ensuring that all projects are completed on time and within budget.
- I once brought down central control which instigated a total facility Lockdown. I wanted to restart the system to try to allivate some slowness but I accidentally caused a full system crash. It was a stressful day but I learned a lot about the fragility of legacy systems and the importance of careful change management.
-I work with a bunch of cops. Nice people but also the least tech savvy group of users imaginable. Lots of training and hand holding required to get them to adopt new tools and processes. It's a challenge but I enjoy the opportunity to make a real impact on their day-to-day work.
-I manage vendors and other departments in not only software but also infastructure projects. Recently did some low voltage wiring for new access points and cameras. Not exactly in the job description but I like to get hands on and learn new skills whenever I can.
-why am i looking to leave? I really love everyone I work with at the Sheriff's Office. I came from north texas and they made me feel really welcome here. I'm looking for a more technical role that will allow me to leverage my skills and experience to their fullest potential. I'm also looking for a role that will allow me to work remotely, because ultimately I want to be able to spend more time with my family and have the flexibility to work from anywhere.
- Key Achievements: Lead end-to-end planning of facility-wide technology upgrades. Awarded Civilian of the Quarter (2025 Q4).

PAST EXPERIENCE:
- Trane (Assistant Project Manager | Dec 2022 - Aug 2023): Managed commercial HVAC/chiller projects, overseeing planning, scheduling, budgeting, and Kanban workflows.
- Axcent Networks (Technical Project Coordinator | Sep 2019 - Dec 2022): Managed the lifecycle of telecommunications circuit provisioning (ASRs) for AT&T and T-Mobile cell towers.

EDUCATION & SKILLS:
- Education: Bachelor of Science in Integrated Studies (University of North Texas). Associate of Science (Dallas College).
- Top Skills: API Integration, Technical Product Management, Systems Integration, Full-Lifecycle Project Management, Cloud Infrastructure.

RULES FOR THE AI:
- If asked about his availability or location: Wes is currently based in El Paso, TX, but is seeking a 100% remote role.
- if someone asks about his current salary or compensation: Wes is currently making $70,000 annually, but is looking for a role in the $90,000 range based on his skills and experience.
- If someone asks a highly specific technical, personal, or pricing question you don't know the answer to, DO NOT hallucinate. Politely direct them to email you directly at westleyhdavis@gmail.com.
`;

// Initialize the model with the System Prompt built-in
const model = genAI.getGenerativeModel({ 
  model: "gemini-3.5-flash",
  systemInstruction: SYSTEM_PROMPT
});

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseText, setResponseText] = useState('');

  const audioRef = useRef(null);

  // Clean up audio blob URLs on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setIsThinking(true);

    try {
      // 1. Fetch text from Gemini
      const result = await model.generateContent(userText);
      const text = result.response.text();
      setResponseText(text);

      // 2. Pipe text to ElevenLabs TTS
      await generateAndPlaySpeech(text);
    } catch (error) {
      console.error("Pipeline Error:", error);
      setIsThinking(false);
      setResponseText('');
    }
  };

  const generateAndPlaySpeech = async (text) => {
    const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: {
              stability: 0.75,       // more consistent delivery
              similarity_boost: 0.85, // sticks closer to your cloned voice
            },
          }),
        }
      );

      if (response.status === 402) throw new Error('QUOTA_EXCEEDED');
      if (!response.ok) throw new Error('ElevenLabs API connection failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setIsThinking(false);
        setIsSpeaking(true);
      };

      audio.onended = () => {
        setIsSpeaking(false);
        setResponseText(''); // hide speech bubble when done
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error('Audio Generation Failed:', error);
      setIsThinking(false);
      setIsSpeaking(false);
      setResponseText('');
      if (error.message === 'QUOTA_EXCEEDED') {
        alert(
          "System Notice: Voice synthesizer quota exceeded. Wes has clearly been getting a lot of traffic! Please reach out to him via email to continue the conversation."
        );
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Expanded Panel (Photo + Speech Bubble + Input) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 md:w-96 bg-zinc-950 border border-emerald-500/30 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.15)] relative"
          >
            {/* Photo area – clipping only the image for rounded top corners */}
            <div className="relative">
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={wesPhoto}
                  alt="Wes Davis"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Speech Bubble – positioned outside to the left, NOT clipped */}
              <AnimatePresence>
                {isSpeaking && responseText && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-1/3 -left-[calc(100%+12px)] w-64 max-w-[calc(100vw-4rem)] bg-zinc-900 text-zinc-100 px-4 py-3 rounded-2xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <p className="text-sm leading-snug">{responseText}</p>
                    {/* Tail pointing RIGHT (toward the photo) */}
                    <div className="absolute top-6 -right-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-zinc-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input field */}
            <div className="p-3 bg-zinc-900 border-t border-zinc-800 rounded-b-lg">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Wes a question..."
                  disabled={isThinking || isSpeaking}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded py-2 pl-3 pr-10 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isThinking || isSpeaking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-300 disabled:opacity-30 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Avatar Orb (your photo as the button) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          boxShadow: isSpeaking 
            ? ['0px 0px 0px rgba(16,185,129,0)', '0px 0px 30px rgba(16,185,129,0.6)', '0px 0px 0px rgba(16,185,129,0)']
            : isOpen 
              ? '0px 0px 15px rgba(16,185,129,0.3)' 
              : '0px 0px 0px rgba(16,185,129,0)',
        }}
        transition={{
          duration: isSpeaking ? 1.2 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-50 overflow-hidden ${
          isThinking ? 'border-amber-500 bg-amber-500/20' : 
          isSpeaking ? 'border-emerald-400 bg-emerald-400/20' : 
          'border-zinc-700 bg-zinc-950 hover:border-emerald-500/50 hover:bg-emerald-900/20'
        }`}
      >
        {/* Your photo */}
        <img 
          src={wesPhoto} 
          alt="Wes Davis" 
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* Thinking spinner overlay */}
        {isThinking && (
          <div className="absolute inset-0 flex items-center justify-center bg-amber-500/30 rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-full border-t-2 border-r-2 border-amber-500"
            />
          </div>
        )}
        
        {/* Speaking mic overlay */}
        {isSpeaking && !isThinking && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-400/20 rounded-full">
            <Mic className="text-emerald-400" size={28} />
          </div>
        )}
        
        {/* Idle green dot when closed */}
        {!isOpen && !isThinking && !isSpeaking && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
}