import { Activity, Zap, Server, Terminal, Shield } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Left Column: Quick Stats / Metrics */}
      <div className="md:col-span-1 space-y-6 flex flex-col">
        
        {/* Metric 1 */}
        <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-lg backdrop-blur-sm hover:border-emerald-500/50 transition-colors duration-300">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <Activity size={18} />
            <h2 className="font-bitcount text-sm tracking-widest">SYSTEM_STATUS</h2>
          </div>
          <p className="text-3xl font-bold text-zinc-100">OPTIMAL</p>
          <p className="text-xs text-zinc-500 font-bitcount mt-1">UPTIME: 99.9%</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-lg backdrop-blur-sm hover:border-purple-500/50 transition-colors duration-300">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <Zap size={18} />
            <h2 className="font-bitcount text-sm tracking-widest">AUTOMATIONS</h2>
          </div>
          <p className="text-3xl font-bold text-zinc-100">42</p>
          <p className="text-xs text-zinc-500 font-bitcount mt-1">ACTIVE WORKFLOWS</p>
        </div>
        
        {/* Metric 3 */}
        <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-lg backdrop-blur-sm hover:border-blue-500/50 transition-colors duration-300">
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <Server size={18} />
            <h2 className="font-bitcount text-sm tracking-widest">APPS_DEPLOYED</h2>
          </div>
          <p className="text-3xl font-bold text-zinc-100">2</p>
          <p className="text-xs text-zinc-500 font-bitcount mt-1">PROD ENVIRONMENTS</p>
        </div>

        {/* Metric 4: Current Enterprise Job (Terminal Style) */}
        <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-lg backdrop-blur-sm hover:border-amber-500/50 transition-colors duration-300 flex-grow">
          <div className="flex items-center gap-3 text-amber-400 mb-3">
            <Shield size={18} />
            <h2 className="font-bitcount text-sm tracking-widest">ACTIVE_DEPLOYMENT</h2>
          </div>
          
          <div className="font-bitcount text-[10px] text-zinc-400 space-y-2 leading-relaxed">
            <p><span className="text-amber-500/70">HOST:</span> EPSO</p>
            <p className="text-zinc-500">----------------------</p>
            <p>&gt; Managing standalone operations app... <span className="text-emerald-400">OK</span></p>
            <p>&gt; Security Systems Management <span className="text-emerald-400">OK</span></p>
            <p>&gt; Hardware provisioning status... <span className="text-emerald-400">ZERO-LATENCY</span></p>
            <p>&gt; Facility Management <span className="text-emerald-400">AUTOMATED</span></p>
            <p className="text-zinc-500 mt-2">----------------------</p>
            <p className="animate-pulse text-amber-400 mt-2">SYS_ADMIN_AWARD: Q4_GRANTED</p>
          </div>
        </div>

      </div>

      {/* Center/Right Area: The Main Stage */}
      <div className="md:col-span-3 bg-zinc-950/30 border border-zinc-800 border-dashed rounded-lg flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-transparent opacity-50"></div>
         <div className="text-center relative z-10">
            <Terminal size={48} className="text-zinc-700 mx-auto mb-4 group-hover:text-emerald-500 transition-colors duration-500" />
            <p className="font-bitcount text-zinc-500 tracking-widest text-sm animate-pulse">AWAITING_KANBAN_MODULE...</p>
         </div>
      </div>

    </div>
  );
}