
import React, { useRef, useEffect, useState, memo } from 'react';
import { useChat } from '../hooks/useChat';
import { useLiveChat } from '../hooks/useLiveChat';
import type { ChatMessage } from '../types';
import ChatAvatarIcon from './icons/ChatAvatarIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import MicrophoneIcon from './icons/MicrophoneIcon';
import { spanishStrings as strings } from '../i18n/strings';
import MarkdownRenderer from './MarkdownRenderer';

interface ChatViewProps {
  onBack: () => void;
  onOpenMenu: () => void;
}

const ROCKET_IMAGE = "https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png";

const ChatMessageBubble: React.FC<{ message: ChatMessage }> = memo(({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex items-end gap-3.5 w-full mb-6 animate-message-entry ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isUser && (
                <div className="relative flex-shrink-0 mb-1">
                    <ChatAvatarIcon className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>
            )}
            <div
                className={`max-w-[88%] md:max-w-[75%] p-5 sm:p-6 rounded-[2.2rem] shadow-2xl transition-all duration-300 relative ${
                    isUser
                        ? 'bg-gradient-to-br from-fuchsia-700 to-fuchsia-900 text-white rounded-br-none border border-fuchsia-500/20'
                        : 'glass-card text-slate-100 rounded-bl-none border-white/10'
                }`}
            >
              {isUser ? (
                 <p className="whitespace-pre-wrap break-words text-base sm:text-lg font-bold leading-relaxed tracking-tight selection:bg-white/20">{message.content}</p>
              ) : (
                <div className="text-base sm:text-lg">
                    <MarkdownRenderer content={message.content} />
                </div>
              )}
            </div>
        </div>
    );
});

const LoadingBubble: React.FC = () => (
  <div className="flex items-end gap-3.5 flex-row mb-6 animate-pulse">
    <div className="relative flex-shrink-0">
        <ChatAvatarIcon className="w-12 h-12 sm:w-14 sm:h-14" isThinking={true} />
    </div>
    <div className="p-6 rounded-[2.2rem] rounded-bl-none glass-card border-teal-500/10 min-w-[80px] flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  </div>
);

const ChatView: React.FC<ChatViewProps> = ({ onBack, onOpenMenu }) => {
  const { messages, sendMessage, isLoading, initializeChat } = useChat();
  const { isActive: isVoiceActive, startVoiceChat, stopVoiceChat } = useLiveChat();
  const [userInput, setUserInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isChatStarted, setIsChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatStarted) {
      scrollToBottom();
    }
  }, [messages, isLoading, isChatStarted]);

  const handleStartChat = () => {
    if (nameInput.trim()) {
      initializeChat(nameInput.trim());
      setIsChatStarted(true);
    }
  };

  const handleSend = () => {
    if (userInput.trim() && !isLoading) {
      sendMessage(userInput.trim());
      setUserInput('');
    }
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      stopVoiceChat();
    } else {
      startVoiceChat();
    }
  };
  
  if (!isChatStarted) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-6 animate-fade-in">
         <header className="fixed top-3 left-0 w-full px-4 z-40">
            <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5 relative overflow-visible">
              <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 relative z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-full flex items-center justify-center">
                <div className="absolute -inset-8 bg-fuchsia-600/25 blur-2xl rounded-full animate-pulse"></div>
                <img src={ROCKET_IMAGE} alt="" className="h-[140%] sm:h-[160%] w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(217,70,239,0.6)] translate-y-1 sm:translate-y-2" />
              </div>

              <button onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 relative z-20">
                <HamburgerIcon className="w-7 h-7" />
              </button>
            </div>
         </header>

         <div className="max-w-md w-full glass-card p-10 rounded-[3rem] text-center border-white/10 shadow-[0_0_50px_rgba(217,70,239,0.15)] mt-12">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-fuchsia-500 blur-2xl opacity-20 animate-pulse"></div>
                <ChatAvatarIcon className="w-24 h-24" />
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">
              {strings.chatNamePromptTitle}
            </h2>
            <p className="text-slate-400 font-bold mb-8 leading-relaxed">
              {strings.chatNamePromptSubtitle}
            </p>

            <div className="space-y-6">
              <input
                type="text"
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartChat()}
                placeholder={strings.chatNamePromptPlaceholder}
                className="w-full bg-slate-900/50 border-2 border-white/10 text-white rounded-2xl py-4 px-6 focus:outline-none focus:border-teal-500/50 transition-all text-lg font-bold placeholder:text-slate-600 text-center"
              />
              <button
                onClick={handleStartChat}
                disabled={!nameInput.trim()}
                className="w-full py-4 px-6 bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale shadow-xl"
              >
                {strings.chatNameSubmit}
              </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="fixed top-3 left-0 w-full px-4 z-40">
        <div className="max-w-4xl mx-auto h-16 sm:h-20 flex justify-between items-center glass-card rounded-[1.8rem] px-6 shadow-2xl border-white/5 relative overflow-visible">
          <div className="flex items-center min-w-0 h-full relative z-20">
            <button onClick={onBack} className="text-white p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-90 flex-shrink-0" aria-label={strings.back}>
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
                    NECESITO HABLAR
                </h1>
            </div>
          </div>
          <button aria-label={strings.menu} onClick={onOpenMenu} className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90 flex-shrink-0 relative z-20">
              <HamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto px-4 sm:px-10 pt-32 sm:pt-40 pb-6 no-scrollbar">
        <div className="space-y-1">
            {messages.map((msg, index) => (
              <ChatMessageBubble key={index} message={msg} />
            ))}
            {isLoading && <LoadingBubble />}
        </div>
        <div ref={messagesEndRef} className="h-4" />
      </main>

      <footer className="p-4 sm:p-8 pb-10">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500/20 to-teal-500/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={strings.chatInputPlaceholder}
              className="relative w-full bg-slate-900/90 border border-white/10 text-white rounded-[1.8rem] py-5 pl-8 pr-16 focus:outline-none focus:border-teal-500/50 transition-all text-base sm:text-lg placeholder:text-slate-500 shadow-2xl backdrop-blur-3xl font-bold"
              disabled={isLoading || isVoiceActive}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !userInput.trim() || isVoiceActive}
              className="absolute right-2.5 top-2.5 w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-fuchsia-800 text-white rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] active:scale-95 disabled:opacity-30 disabled:grayscale"
              aria-label={strings.chatSendButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={toggleVoice}
            className={`w-14 h-14 rounded-[1.8rem] flex items-center justify-center transition-all duration-500 relative shadow-2xl border ${
              isVoiceActive 
              ? 'bg-fuchsia-600 border-fuchsia-400 animate-pulse' 
              : 'bg-slate-800 border-white/10 hover:bg-slate-700'
            }`}
            aria-label={isVoiceActive ? strings.stopVoiceChat : strings.startVoiceChat}
          >
            {isVoiceActive && (
               <div className="absolute inset-0 rounded-[1.8rem] border-4 border-fuchsia-400/50 animate-ping"></div>
            )}
            <MicrophoneIcon className={`w-7 h-7 ${isVoiceActive ? 'text-white' : 'text-teal-400'}`} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatView;
