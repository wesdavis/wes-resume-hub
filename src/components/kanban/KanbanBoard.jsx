import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Archive, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import sunCityLogo from './suncitylogo.png';
import tapTapLogo from './taptaplogo.png';

// --- ANIMATION VARIANTS ---
const boardVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function KanbanBoard() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="relative min-h-screen p-4 md:p-6 overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-screen-2xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2 className="font-bitcount text-xl md:text-2xl text-emerald-400 tracking-widest mb-1 md:mb-2">RESUME_BOARD</h2>
          <p className="text-zinc-400 font-bitcount text-xs md:text-sm">VIEWING: WES_DAVIS_CAREER_PROGRESSION</p>
        </div>

        {/* MOBILE CAROUSEL / DESKTOP GRID */}
        <motion.div 
          variants={boardVariants}
          initial="hidden"
          animate="show"
          className="flex md:grid overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory md:snap-none grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 items-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          
          {/* ========================================== */}
          {/* COLUMN 1: SHIPPED (EMERALD ACCENT)         */}
          {/* ========================================== */}
          <motion.div variants={columnVariants} className="w-[85vw] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none bg-zinc-950/60 backdrop-blur-md rounded-lg border border-zinc-800/50 p-4 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bitcount text-sm">
                <CheckCircle2 size={16} />
                <h3>SHIPPED (PRODUCTS)</h3>
              </div>
              <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">2</span>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('suncity')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/20 group-hover:bg-emerald-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">Sun City Connect</h4>
                    <p className="text-xs text-zinc-400 mt-1 mb-3">AI Automation Platform</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'suncity' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                
                <div className="flex gap-2 text-[10px] font-bitcount mb-2">
                  <span className="bg-zinc-800 text-emerald-400 px-2 py-1 rounded">Meta API</span>
                  <span className="bg-zinc-800 text-emerald-400 px-2 py-1 rounded">CRM</span>
                </div>

                <AnimatePresence>
                  {expandedCard === 'suncity' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-300 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Architected and deployed an AI-powered CRM command center designed to optimize revenue operations and lead management workflows.</p>
                      <p>• Integrated Meta Graph APIs to launch automated AI sales assistants on Facebook and Instagram, autonomously pre-qualifying leads and booking appointments in under three seconds.</p>
                      <p>• Designed overarching system architecture leveraging automated webhooks to completely replace manual customer-acquisition pipelines.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('taptap')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/20 group-hover:bg-emerald-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">TapTap Social</h4>
                    <p className="text-xs text-zinc-400 mt-1 mb-3">Cross-Platform Mobile App</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'taptap' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <div className="flex gap-2 text-[10px] font-bitcount mb-2">
                  <span className="bg-zinc-800 text-emerald-400 px-2 py-1 rounded">React</span>
                  <span className="bg-zinc-800 text-emerald-400 px-2 py-1 rounded">Supabase</span>
                </div>

                <AnimatePresence>
                  {expandedCard === 'taptap' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-300 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Directed full-lifecycle product management and technical execution to successfully launch a cross-platform app on the Apple App Store and Google Play Store.</p>
                      <p>• Engineered scalable backend architecture using Supabase and PostgreSQL, implementing real-time notifications and proximity spatial data logic.</p>
                      <p>• Developed serverless Deno Edge Functions and automated webhooks to process background workflows with sub-second latency.</p>
                      <p>• Automated data pipelines via Google Maps APIs to dynamically fetch, cache, and sync geographic location metadata.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* COLUMN 2: IN SPRINT (BLUE ACCENT)          */}
          {/* ========================================== */}
          <motion.div variants={columnVariants} className="w-[85vw] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none bg-zinc-950/60 backdrop-blur-md rounded-lg border border-zinc-800/50 p-4 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-blue-400 font-bitcount text-sm">
                <Clock size={16} />
                <h3>IN SPRINT (CURRENT OPS)</h3>
              </div>
              <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">1</span>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('epso')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/20 group-hover:bg-blue-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">El Paso Sheriff's Office</h4>
                    <p className="text-xs text-zinc-400 mt-1 mb-3">IT Project Coordinator • Aug 2023 - Present</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'epso' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-bitcount mb-2">
                  <span className="bg-zinc-800 text-blue-400 px-2 py-1 rounded">PM</span>
                  <span className="bg-zinc-800 text-blue-400 px-2 py-1 rounded">IT Coordinator</span>
                  <span className="bg-zinc-800 text-amber-400 px-2 py-1 rounded">Awarded Q4</span>
                </div>

                <AnimatePresence>
                  {expandedCard === 'epso' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-300 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Acting as the primary IT liaison between multiple stakeholders for translating technical requirements into actionable workflow goals.</p>
                      <p>• Commanded end-to-end technical execution for facility technology rollouts, including a 500-user MS Teams transition and domain migration.</p>
                      <p>• Administered and troubleshot complex standalone software applications to maximize system uptime and maintain mission-critical facility performance.</p>
                      <p>• Managed tier-1 technical operations and hardware provisioning for high-stakes routing, network infrastructure, and specialized security systems.</p>
                      <p>• Awarded 2025 Q4 Civilian of the Quarter for exceptional project coordination, stakeholder management, and resource optimization.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* COLUMN 3: BACKLOG (ZINC ACCENT)            */}
          {/* ========================================== */}
          <motion.div variants={columnVariants} className="w-[85vw] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none bg-zinc-950/60 backdrop-blur-md rounded-lg border border-zinc-800/50 p-4 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-400 font-bitcount text-sm">
                <Archive size={16} />
                <h3>BACKLOG (ARCHIVE)</h3>
              </div>
              <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">2</span>
            </div>

            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('trane')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-zinc-500/50 hover:shadow-[0_0_15px_rgba(161,161,170,0.1)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-500/20 group-hover:bg-zinc-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">Trane Technologies</h4>
                    <p className="text-xs text-zinc-500 mt-1">Commercial HVAC Project Management</p>
                    <p className="text-[10px] text-zinc-600 mt-1 mb-2">Dec 2022 - Aug 2023</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'trane' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCard === 'trane' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-400 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Assisted Project Managers across full project lifecycle phases including planning, procurement, scheduling, budgeting, and active site engineering.</p>
                      <p>• Coordinated directly with cross-functional technical teams (engineers, technicians, subcontractors) to secure timely, budget-conscious project delivery.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('axcent')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-zinc-500/50 hover:shadow-[0_0_15px_rgba(161,161,170,0.1)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-500/20 group-hover:bg-zinc-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">Axcent Networks</h4>
                    <p className="text-xs text-zinc-500 mt-1">Telecom Provisioning (AT&T / T-Mobile)</p>
                    <p className="text-[10px] text-zinc-600 mt-1 mb-2">Sept 2019 - Dec 2022</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'axcent' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCard === 'axcent' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-400 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Managed full lifecycle provisioning of complex telecommunications circuits for national carriers, specializing in high-accuracy Access Service Requests (ASRs).</p>
                      <p>• Monitored system paths from initial requirement gathering to deployment activation, coordinating with third-party vendors to eliminate technical blockers.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* COLUMN 4: EDUCATION (INDIGO ACCENT)        */}
          {/* ========================================== */}
          <motion.div variants={columnVariants} className="w-[85vw] md:w-auto shrink-0 md:shrink snap-center md:snap-align-none bg-zinc-950/60 backdrop-blur-md rounded-lg border border-zinc-800/50 p-4 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-indigo-400 font-bitcount text-sm">
                <GraduationCap size={16} />
                <h3>TRAINING (ARCHIVES)</h3>
              </div>
              <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">2</span>
            </div>

            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('edu-unt')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/20 group-hover:bg-indigo-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-300 group-hover:text-indigo-300 transition-colors">B.S. Integrated Studies</h4>
                    <p className="text-xs text-zinc-500 mt-1">University of North Texas • Class of 2016</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'edu-unt' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-bitcount mt-3 mb-2">
                  <span className="bg-zinc-800/80 text-indigo-400/80 px-2 py-1 rounded">Systems Thinking</span>
                  <span className="bg-zinc-800/80 text-indigo-400/80 px-2 py-1 rounded">Analysis</span>
                </div>

                <AnimatePresence>
                  {expandedCard === 'edu-unt' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-400 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• Multidisciplinary degree in english, sociology, and business with an emphasis on critical thinking and analytical skills.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCard('edu-dc')}
                className="relative bg-zinc-900/80 border border-zinc-800 p-4 pl-5 rounded-lg cursor-pointer hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/20 group-hover:bg-indigo-400 transition-colors" />

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-zinc-300 group-hover:text-indigo-300 transition-colors">Associate of Science</h4>
                    <p className="text-xs text-zinc-500 mt-1">Dallas College • Class of 2013</p>
                  </div>
                  <div className="text-zinc-500 mt-1">
                    {expandedCard === 'edu-dc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[10px] font-bitcount mt-3 mb-2">
                  <span className="bg-zinc-800/80 text-indigo-400/80 px-2 py-1 rounded">Mathematics</span>
                  <span className="bg-zinc-800/80 text-indigo-400/80 px-2 py-1 rounded">Statistics</span>
                </div>

                <AnimatePresence>
                  {expandedCard === 'edu-dc' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs text-zinc-400 space-y-2 pt-2 border-t border-zinc-800 mt-2 architecture-details"
                    >
                      <p>• General studies with an emphasis on foundational mathematics and logical reasoning.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </div>
      
      {/* ========================================== */}
      {/* FLOATING PROJECT ORBS (BOTTOM LEFT)        */}
      {/* ========================================== */}
      <div className="fixed bottom-6 left-4 md:left-6 z-50 flex flex-col gap-4">
        
        {/* Sun City Connect Orb */}
        <motion.a
          href="https://suncityconnect.com" 
          target="_blank"
          rel="noopener noreferrer"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-zinc-950/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-emerald-900/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <img src={sunCityLogo} alt="Sun City Connect Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          
          <div className="pointer-events-none absolute left-14 md:left-16 top-1/2 -translate-y-1/2 rounded border border-emerald-500/30 bg-zinc-950/90 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 whitespace-nowrap shadow-lg">
            <p className="font-bitcount text-[10px] text-emerald-400 tracking-wider">INITIATE: SUN_CITY_CONNECT</p>
          </div>
        </motion.a>

        {/* TapTap Social Orb */}
        <motion.a
          href="https://join.get-taptap.com"
          target="_blank"
          rel="noopener noreferrer"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-zinc-950/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:border-emerald-400 hover:bg-emerald-900/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <img src={tapTapLogo} alt="TapTap Social Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          
          <div className="pointer-events-none absolute left-14 md:left-16 top-1/2 -translate-y-1/2 rounded border border-emerald-500/30 bg-zinc-950/90 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 whitespace-nowrap shadow-lg">
            <p className="font-bitcount text-[10px] text-emerald-400 tracking-wider">INITIATE: TAPTAP_SOCIAL</p>
          </div>
        </motion.a>

      </div>
    </div>
  );
}