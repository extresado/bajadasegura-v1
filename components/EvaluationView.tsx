
import React, { useState } from 'react';
import { chatCompletion } from '../services/geminiService';
import Footer from './Footer';
import HamburgerIcon from './icons/HamburgerIcon';
import LoadingSpinner from './LoadingSpinner';
import { spanishStrings as strings } from '../i18n/strings';
import MarkdownRenderer from './MarkdownRenderer';

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const EvaluationView: React.FC<{ onBack: () => void; onOpenMenu: () => void }> = ({ onBack, onOpenMenu }) => {
  const questions = [
    { id: 'frequency', text: strings.evaluationQuestionFrequency, options: [strings.evaluationOptionOften, strings.evaluationOptionOnceAWeek, strings.evaluationOptionCoupleTimesMonth, strings.evaluationOptionRarelyNever] },
    { id: 'control', text: strings.evaluationQuestionControl, options: [strings.evaluationOptionAlwaysMostly, strings.evaluationOptionSometimes, strings.evaluationOptionRarelyNeverControl] },
    { id: 'impact', text: strings.evaluationQuestionImpact, options: [strings.evaluationOptionSignificantly, strings.evaluationOptionALittle, strings.evaluationOptionNotSure, strings.evaluationOptionNotAtAll] },
    { id: 'feelings', text: strings.evaluationQuestionFeelings, options: [strings.evaluationOptionAnxiousDepressedEmpty, strings.evaluationOptionTiredButGood, strings.evaluationOptionNormalNoChange, strings.evaluationOptionEnergizedPositive] },
    { id: 'alone', text: strings.evaluationQuestionAlone, options: [strings.evaluationOptionYesOften, strings.evaluationOptionYesSometimes, strings.evaluationOptionThoughtAboutButNotDone, strings.evaluationOptionNoNever] },
  ];

  const [step, setStep] = useState<'intro' | 'questions' | 'loading' | 'result'>('intro');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [context, setContext] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    if (!name.trim()) {
        setError(strings.evaluationNameRequiredError);
        return;
    }
    setError(null);
    setStep('questions');
  }

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 300);
    }
  };
  
  const handlePreviousQuestion = () => {
    if(currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const isFormComplete = Object.keys(answers).length === questions.length;

  const handleSubmit = async () => {
    if (!isFormComplete) return;
    
    setStep('loading');
    setError(null);

    const prompt = `Un usuario llamado ${name} (edad: ${age || 'no especificada'}) ha completado un cuestionario sobre chemsex. Contexto: "${context || 'Ninguno'}". Respuestas: ${questions.map(q => `- ${q.text}: ${answers[q.id]}`).join('\n')}. Basado en esto, genera una "Autoevaluación IA" de apoyo y sin juicios en 2-3 párrafos. Dirígete a ${name}, valida sus sentimientos, identifica riesgos de forma constructiva, y sugiere reflexión o buscar apoyo. NO des un diagnóstico. Usa un tono calmado, empático y de colega. Responde en español.`;

    try {
      const text = await chatCompletion([{ role: 'user', content: prompt }]);
      setResult(text);
    } catch (e) {
      console.error(e);
      setError(strings.evaluationErrorGenerating);
    } finally {
      setStep('result');
    }
  };

  const handleReset = () => {
      setName(''); setAge(''); setContext(''); setAnswers({}); setResult(null); setError(null); setCurrentQuestionIndex(0); setStep('intro');
  }
  
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  const renderContent = () => {
    switch (step) {
      case 'intro':
        return (
            <div className="animate-fade-in space-y-8 max-w-2xl mx-auto">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter mb-4">{strings.evaluationIntroTitle}</h2>
                  <p className="text-slate-400 font-bold leading-relaxed">{strings.evaluationIntroText}</p>
                </div>

                <div className="space-y-6 bg-slate-800/40 p-8 rounded-[2.5rem] border border-white/5">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-black text-slate-500 uppercase tracking-widest">{strings.evaluationNameLabel}</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700" placeholder={strings.evaluationNamePlaceholder} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label htmlFor="age" className="block mb-2 text-sm font-black text-slate-500 uppercase tracking-widest">{strings.evaluationAgeLabel}</label>
                          <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700" placeholder={strings.evaluationAgePlaceholder} />
                      </div>
                    </div>
                    <div>
                        <label htmlFor="context" className="block mb-2 text-sm font-black text-slate-500 uppercase tracking-widest">{strings.evaluationContextLabel}</label>
                        <textarea id="context" value={context} onChange={e => setContext(e.target.value)} rows={3} className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-fuchsia-500/50 transition-all text-lg font-bold placeholder:text-slate-700 resize-none" placeholder={strings.evaluationContextPlaceholder}></textarea>
                    </div>
                </div>
                {error && <p className="text-red-400 text-center font-bold animate-shake">{error}</p>}
                <button onClick={handleStart} className="w-full py-5 px-8 bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 text-white font-black text-xl rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                    {strings.evaluationStartButton}
                </button>
            </div>
        );
      
      case 'questions':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div className="flex flex-col flex-grow max-w-2xl mx-auto w-full">
            <div className="mb-10">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-black text-fuchsia-500 uppercase tracking-[0.3em]">{strings.evaluationQuestionProgress(currentQuestionIndex + 1, questions.length)}</span>
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{Math.round(progressPercentage)}% completado</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-fuchsia-500 to-teal-400 h-full transition-all duration-700 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            <div className="flex-grow space-y-8">
                 <div key={currentQuestion.id} className="animate-fade-in">
                    <h3 className="mb-10 text-2xl sm:text-3xl font-black text-white tracking-tighter text-center leading-tight">
                      {currentQuestion.text}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option) => (
                        <button 
                          key={option} 
                          onClick={() => handleAnswerSelect(currentQuestion.id, option)} 
                          className={`group w-full text-center p-6 rounded-[2rem] border-2 transition-all duration-500 relative overflow-hidden ${
                            answers[currentQuestion.id] === option 
                            ? 'bg-fuchsia-500/20 border-fuchsia-500 shadow-[0_0_30px_rgba(217,70,239,0.2)]' 
                            : 'bg-slate-800/40 border-white/10 hover:border-white/30 hover:bg-slate-800'
                          }`}
                        >
                            <span className={`text-lg font-black transition-colors ${answers[currentQuestion.id] === option ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                              {option}
                            </span>
                        </button>
                    ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="py-4 px-8 font-black rounded-2xl text-slate-500 border-2 border-white/10 hover:border-white/20 disabled:opacity-0 transition-all active:scale-95">
                    {strings.evaluationBackButton}
                </button>
                {isFormComplete && (
                    <button onClick={handleSubmit} className="py-5 px-10 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-lg rounded-2xl shadow-xl transition-all hover:scale-[1.05] active:scale-95 animate-fade-in">
                        {strings.evaluationSubmitButton}
                    </button>
                )}
            </div>
          </div>
        );

      case 'loading':
        return <div className="py-20"><LoadingSpinner message={strings.evaluationLoadingMessage(name)} /></div>;
      
      case 'result':
        return (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto w-full">
            <h2 className="text-3xl font-black text-white tracking-tighter">{strings.evaluationResultTitle(name)}</h2>
            {error ? (
              <p className="text-center text-red-400 p-8 font-bold">{error}</p>
            ) : (
              <div className="p-8 bg-slate-800/40 backdrop-blur-3xl rounded-[2.5rem] border border-teal-500/20 shadow-2xl">
                  <MarkdownRenderer content={result || ''} />
              </div>
            )}
            <p className="text-sm font-bold text-slate-500 italic text-center px-6 leading-relaxed">
              {strings.evaluationResultDisclaimer}
            </p>
            <div className="flex gap-4">
              <button onClick={handleReset} className="flex-1 py-5 px-8 border-2 border-white/10 rounded-2xl font-black text-slate-400 hover:text-white hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-xs">
                  {strings.evaluationResetButton}
              </button>
              <button onClick={onBack} className="flex-1 py-5 px-8 bg-slate-900 border border-white/10 rounded-2xl font-black text-white hover:bg-slate-800 transition-all active:scale-95 uppercase tracking-widest text-xs">
                  {strings.back} al Inicio
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5 relative overflow-visible">
          <div className="flex items-center min-w-0 h-full relative z-20">
            <button onClick={step === 'questions' ? handleReset : onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center min-w-0 ml-1 h-full">
                <div className="relative flex items-center justify-center h-full mr-4 flex-shrink-0 translate-y-3">
                    <div className="absolute -inset-10 bg-fuchsia-600/25 blur-2xl rounded-full animate-pulse"></div>
                    <img src={ROCKET_IMAGE} alt="" className="h-[160%] sm:h-[180%] w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]" />
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white leading-none tracking-tight uppercase truncate">
                    {strings.evaluationButtonTitle}
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0 relative z-20">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-6 sm:px-10 pt-32 sm:pt-40 pb-24 no-scrollbar flex flex-col">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default EvaluationView;
