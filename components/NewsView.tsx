
import React, { useState, useEffect } from 'react';
import { getRecentChemsexNews } from '../services/geminiService';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import type { NewsArticle } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { spanishStrings as strings } from '../i18n/strings';
import NewsCard from './NewsCard';

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

interface NewsViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const parseTextForArticles = (markdown: string): NewsArticle[] => {
  const articles: NewsArticle[] = [];
  const blocks = markdown.split('---').filter(block => block.trim() !== '');

  blocks.forEach(block => {
    const lines = block.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    if (lines.length >= 2) {
      const titleLine = lines.find(l => l.startsWith('###')) || lines[0];
      const title = titleLine.replace(/^###\s*/, '').trim();
      
      let summaryParts: string[] = [];
      let url = '#';
      
      lines.forEach(line => {
        if (line === titleLine) return;
        if (line.toLowerCase().startsWith('http') || line.toLowerCase().includes('www.')) {
          url = line.match(/https?:\/\/[^\s)]+/)?.[0] || line;
        } else {
          summaryParts.push(line);
        }
      });

      const summary = summaryParts.join(' ').substring(0, 180) + (summaryParts.join(' ').length > 180 ? '...' : '');
      if (title && summary.length > 10) {
        articles.push({ title, summary, url });
      }
    }
  });
  return articles;
};

const NewsView: React.FC<NewsViewProps> = ({ onBack, onOpenMenu }) => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true); 
      setError(null); 
      try {
        const textResponse = await getRecentChemsexNews();
        const finalArticles = parseTextForArticles(textResponse);

        if (finalArticles.length > 0) { 
          setNewsArticles(finalArticles); 
        } else { 
          setError("No se encontraron noticias recientes. Inténtalo de nuevo más tarde."); 
        }
      } catch (e) {
        console.error("Error fetching news:", e); 
        setError(strings.newsErrorFetching);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5">
          <div className="flex items-center min-w-0">
            <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center min-w-0 ml-1">
                <div className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 mr-3 flex-shrink-0">
                    <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full animate-pulse"></div>
                    <img src={ROCKET_IMAGE} alt="" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                </div>
                <h1 className="text-base sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                    {strings.newsHeaderTitle}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar animate-fade-in">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tighter">
            Actualidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">Grounding</span>
          </h2>
          <p className="text-lg text-slate-400 font-bold leading-relaxed max-w-2xl">
            Información verificada mediante Google Search sobre el impacto del chemsex en nuestra comunidad.
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner message="Buscando en Google News..." />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-400 p-8 rounded-3xl border border-red-500/20 text-center animate-fade-in">
            <p className="font-bold text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsArticles.map((article, index) => (
              <NewsCard 
                key={index}
                title={article.title}
                summary={article.summary}
                url={article.url}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NewsView;
