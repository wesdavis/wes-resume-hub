import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Archive, ChevronDown, ChevronUp } from 'lucide-react';

export default function KanbanBoard() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="font-bitcount text-2xl text-emerald-400 tracking-widest mb-2">PRODUCT_ROADMAP</h2>
        <p className="text-zinc-400 font-bitcount text-sm">VIEWING: WES_DAVIS_CAREER_PROGRESSION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Column 1: Shipped (Products) */}
        <div className="bg-zinc-950/40 rounded-lg border border-zinc-800 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bitcount text-sm">
              <CheckCircle2 size={16} />
              <h3>SHIPPED (PRODUCTS)</h3>
            </div>
            <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">2</span>
          </div>
          
          <div className="space-y-4">
            {/* Sun City Connect */}
            <div 
              onClick={() => toggleCard('suncity')}
              className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg cursor-pointer hover:border-emerald-500 transition-colors group"
            >
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
            </div>

            {/* TapTap Social */}
            <div 
              onClick={() => toggleCard('taptap')}
              className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg cursor-pointer hover:border-emerald-500 transition-colors group"
            >
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
                    <p>• Directed full-lifecycle product management and technical execution to successfully launch a cross-platform app on the Apple App Store and Google Play Store[cite: 1, 2].</p>
                    <p>• Engineered scalable backend architecture using Supabase and PostgreSQL, implementing real-time notifications and proximity spatial data logic[cite: 1, 2].</p>
                    <p>• Developed serverless Deno Edge Functions and automated webhooks to process background workflows with sub-second latency[cite: 1].</p>
                    <p>• Automated data pipelines via Google Maps APIs to dynamically fetch, cache, and sync geographic location metadata[cite: 1].</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Column 2: In Sprint (Current Ops) */}
        <div className="bg-zinc-950/40 rounded-lg border border-zinc-800 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-blue-400 font-bitcount text-sm">
              <Clock size={16} />
              <h3>IN SPRINT (CURRENT OPS)</h3>
            </div>
            <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">1</span>
          </div>
          
          <div className="space-y-4">
            <div 
              onClick={() => toggleCard('epso')}
              className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg cursor-pointer hover:border-blue-500 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">El Paso Sheriff's Office - Aug 2023 - Present</h4>
                  <p className="text-xs text-zinc-400 mt-1 mb-3">IT Project Coordinator[cite: 1, 2]</p>
                </div>
                <div className="text-zinc-500 mt-1">
                  {expandedCard === 'epso' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-bitcount mb-2">
                <span className="bg-zinc-800 text-blue-400 px-2 py-1 rounded">Automation</span>
                <span className="bg-zinc-800 text-blue-400 px-2 py-1 rounded">MS Teams</span>
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
                    <p>• Streamlined complex department workflows by integrating core platform automations, including custom Jira updates and InTime scheduling optimizations.</p>
                    <p>• Commanded end-to-end technical execution for facility technology rollouts, including a 500-user MS Teams transition and domain migration[cite: 2].</p>
                    <p>• Administered and troubleshot complex standalone software applications to maximize system uptime and maintain mission-critical facility performance.</p>
                    <p>• Managed tier-1 technical operations and hardware provisioning for high-stakes routing, network infrastructure, and specialized security systems[cite: 1, 2].</p>
                    <p>• Awarded 2025 Q4 Civilian of the Quarter for exceptional project coordination, stakeholder management, and resource optimization[cite: 2].</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Column 3: Backlog (Past Exp) */}
        <div className="bg-zinc-950/40 rounded-lg border border-zinc-800 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-400 font-bitcount text-sm">
              <Archive size={16} />
              <h3>BACKLOG (ARCHIVE)</h3>
            </div>
            <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">2</span>
          </div>

          <div className="space-y-4">
            {/* Trane */}
            <div 
              onClick={() => toggleCard('trane')}
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-lg opacity-75 cursor-pointer hover:opacity-100 hover:border-zinc-500 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">Trane Technologies - Dec 2022 - Aug 2023</h4>
                  <p className="text-xs text-zinc-500 mt-1">Commercial HVAC Project Management[cite: 2]</p>
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
                    <p>• Assisted Project Managers across full project lifecycle phases including planning, procurement, scheduling, budgeting, and active site engineering[cite: 1, 2].</p>
                    <p>• Coordinated directly with cross-functional technical teams (engineers, technicians, subcontractors) to secure timely, budget-conscious project delivery[cite: 1, 2].</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Axcent */}
            <div 
              onClick={() => toggleCard('axcent')}
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg shadow-lg opacity-75 cursor-pointer hover:opacity-100 hover:border-zinc-500 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">Axcent Networks - Sept 2019 - Dec 2022 </h4>
                  <p className="text-xs text-zinc-500 mt-1">Telecom Provisioning (AT&T / T-Mobile)[cite: 2]</p>
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
                    <p>• Managed full lifecycle provisioning of complex telecommunications circuits for national carriers, specializing in high-accuracy Access Service Requests (ASRs)[cite: 1, 2].</p>
                    <p>• Monitored system paths from initial requirement gathering to deployment activation, coordinating with third-party vendors to eliminate technical blockers[cite: 1, 2].</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}