import { Mail, Phone, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Topbar() {
  return (
    <nav className="w-full bg-zinc-950/80 border-b border-zinc-800 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between backdrop-blur-md sticky top-0 z-50 gap-4 md:gap-0">
      
      {/* Brand & Mobile Socials Row */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-4">
          <h1 className="font-bitcount text-2xl text-emerald-400 tracking-wider drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
            WES_DAVIS
          </h1>
          {/* Hide tagline on mobile so it doesn't wrap and look messy */}
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline font-bitcount text-xs text-zinc-400 tracking-widest uppercase">
            Click my picture below to interview me!
          </span>
        </div>

        {/* These socials only show on Mobile, opposite your name */}
        <div className="flex md:hidden items-center gap-4 text-zinc-400">
          <a href="https://github.com/wesdavis" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/westleydavis" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="flex items-center justify-center md:justify-end gap-8 md:gap-6 font-bitcount text-xs text-zinc-300 w-full md:w-auto">
        
        <a href="mailto:westleyhdavis@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300">
          <Mail size={16} />
          {/* Text is hidden on mobile, leaving just the clickable icon */}
          <span className="hidden md:inline">WESTLEYHDAVIS@GMAIL.COM</span>
        </a>
        
        <a href="tel:2145922073" className="flex items-center gap-2 hover:text-emerald-400 transition-colors duration-300">
          <Phone size={16} />
          <span className="hidden md:inline">214.592.2073</span>
        </a>
        
        <div className="flex items-center gap-2 text-zinc-500">
          <MapPin size={16} />
          <span className="hidden md:inline">EL PASO, TX</span>
        </div>
        
        {/* Desktop Social Links */}
        <div className="hidden md:flex items-center gap-4 ml-2 border-l border-zinc-800 pl-6">
           <a href="https://github.com/wesdavis" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors duration-300">
             <FaGithub size={18} />
           </a>
           <a href="https://www.linkedin.com/in/westleydavis" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors duration-300">
             <FaLinkedin size={18} />
           </a>
        </div>
      </div>
      
    </nav>
  );
}