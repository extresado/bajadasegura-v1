
import React, { useState } from 'react';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface JoinUsViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const JoinUsView: React.FC<JoinUsViewProps> = ({ onBack, onOpenMenu }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!name.trim() || !email.trim() || !message.trim()) { setError(strings.formErrorRequired); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError(strings.formErrorEmailInvalid); return; }
    
    setError(null); setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('name', name); formData.append('email', email); formData.append('message', message); formData.append('_subject', `Nueva colaboración para Bajada Segura: ${name}`);

    try {
      const response = await fetch(FORM_ENDPOINT, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (response.ok) { setStatus('submitted'); } else { const data = await response.json(); console.error("Form submission error:", data); setError(data.message || strings.formErrorGeneral); }
    } catch (e) {
      console.error('Error al enviar el formulario:', e); setError(strings.formErrorGeneral);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    {strings.joinUsTitle}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-24 no-scrollbar text-slate-300 leading-relaxed space-y-12 animate-fade-in">
        {status !== 'submitted' ? (
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-fuchsia-400 tracking-tighter">{strings.joinUsIntro.split('.')[0]}!</h2>
              <p className="text-lg font-bold leading-relaxed">{strings.joinUsIntro}</p>
            </section>

            <section className="space-y-6 bg-slate-800/30 p-8 rounded-[2.5rem] border border-white/5">
              <h2 className="text-2xl font-black text-teal-400 tracking-tight flex items-center gap-3">
                <span className="p-2 bg-teal-500/10 rounded-xl">✨</span>
                {strings.howToHelpTitle}
              </h2>
              <p className="text-slate-400 font-bold">{strings.howToHelpText}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[strings.communicatingHelp, strings.designingHelp, strings.proposingHelp, strings.supportingHelp].map((help, idx) => (
                  <li key={idx} className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 flex flex-col gap-1">
                    <strong className="text-white tracking-tight">{help.split(':')[0]}</strong>
                    <span className="text-sm text-slate-500">{help.split(':')[1]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-black text-white tracking-tighter text-center">{strings.contactFormTitle}</h2>
              <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/40 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl max-w-2xl mx-auto">
                <div>
                  <label htmlFor="name" className="block mb-2 text-xs font-black text-slate-500 uppercase tracking-widest">{strings.formNameLabel}</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-xs font-black text-slate-500 uppercase tracking-widest">{strings.formEmailLabel}</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700" required />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-xs font-black text-slate-500 uppercase tracking-widest">{strings.formMessageLabel}</label>
                  <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700 resize-none" placeholder={strings.formMessagePlaceholder} required></textarea>
                </div>
                {error && <p className="text-red-400 text-center font-bold animate-shake">{error}</p>}
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-5 px-8 bg-gradient-to-r from-teal-500 to-teal-700 text-slate-950 font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30"
                >
                   {isSubmitting ? strings.formSubmitting : strings.formSubmitButton}
                </button>
              </form>
            </section>
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center animate-fade-in space-y-8">
            <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-4">{strings.formSubmittedSuccessTitle}</h2>
              <p className="text-slate-400 font-bold text-lg max-w-md mx-auto">{strings.formSubmittedSuccessText}</p>
            </div>
            <button onClick={onBack} className="py-4 px-8 bg-slate-900 border-2 border-white/10 rounded-2xl font-black text-white hover:bg-slate-800 transition-all active:scale-95">{strings.formBackToHomeButton}</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JoinUsView;
