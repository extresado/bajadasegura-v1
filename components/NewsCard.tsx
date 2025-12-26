
import React from 'react';

interface NewsCardProps {
  title: string;
  summary: string;
  url: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, summary, url }) => {
  return (
    <div className="group relative glass-card p-6 sm:p-8 rounded-[2.5rem] border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 overflow-hidden animate-fade-in">
      {/* Background Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">
            Actualidad
          </span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-tight group-hover:text-teal-300 transition-colors">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm sm:text-base mb-8 line-clamp-3 font-medium leading-relaxed">
          {summary}
        </p>
        
        <div className="mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm transition-all hover:bg-teal-500 hover:border-teal-400 hover:text-slate-900 active:scale-95 group/btn shadow-inner"
          >
            Leer más
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsCard);
