import { Mail, Phone, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Topbar() {
  return (
    <nav className="w-full bg-zinc-950/80 border-b border-zinc-800 px-6 py-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-50">
      
      {/* Brand / Name Section */}
      <div className="flex items-center gap-4">
        <h1 className="font-bitcount text-2xl text-emerald-400 tracking-wider drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
          WES_DAVIS
        </h1>
        <span className="text-zinc-600">|</span>
        <span className="font-bitcount text-xs text-zinc-400 tracking-widest uppercase">
          Automation_Architect
        </span>
      </div>

      {/* Contact Info Section */}
      <div className="flex items-center gap-6 font-bitcount text-xs text-zinc-300">
        <a 
          href="mailto:westleyhdavis@gmail.com" 
          className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300"
        >
          <Mail size={14} />
          <span>WESTLEYHDAVIS@GMAIL.COM</span>
        </a>
        
        <a 
          href="tel:2145922073" 
          className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300"
        >
          <Phone size={14} />
          <span>214.592.2073</span>
        </a>
        
        <div className="flex items-center gap-2 text-zinc-500">
          <MapPin size={14} />
          <span>EL PASO, TX</span>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4 ml-2 border-l border-zinc-800 pl-6">
           <a 
             href="https://github.com/wesdavis" 
             target="_blank" 
             rel="noreferrer" 
             className="hover:text-emerald-400 transition-colors duration-300"
           >
             <FaGithub size={18} />
           </a>
           <a 
             href="https://www.linkedin.com/in/westleydavis" 
             target="_blank" 
             rel="noreferrer" 
             className="hover:text-emerald-400 transition-colors duration-300"
           >
             <FaLinkedin size={18} />
           </a>
        </div>
      </div>
      
    </nav>
  );
}