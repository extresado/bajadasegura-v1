
import React, { memo } from 'react';
import type { View } from '../types';
import HomeIcon from './icons/HomeIcon';
import UserPlusIcon from './icons/UserPlusIcon';
import UsersIcon from './icons/UsersIcon';
import QuestionMarkIcon from './icons/QuestionMarkIcon';
import NewsIcon from './icons/NewsIcon';
import { spanishStrings as strings } from '../i18n/strings';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  onNavigate: (view: View) => void;
  isActive: boolean;
}> = memo(({ view, label, icon, onNavigate, isActive }) => {
  return (
    <li>
      <button
        onClick={() => onNavigate(view)}
        className={`w-full text-left p-3 my-1 text-lg rounded-full transition-colors flex items-center ${
          isActive
            ? 'bg-fuchsia-500/20 text-fuchsia-200'
            : 'text-slate-300 hover:bg-slate-800'
        }`}
      >
        <span className="mr-4 ml-2">{icon}</span>
        <span>{label}</span>
      </button>
    </li>
  );
});

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate, currentView }) => {
  const navItems = [
    { view: 'menu' as View, label: strings.homeMenuItem, icon: <HomeIcon /> },
    { view: 'about' as View, label: strings.aboutMenuItem, icon: <UsersIcon /> },
    { view: 'chemsex' as View, label: strings.whatIsChemsexMenuItem, icon: <QuestionMarkIcon /> },
    { view: 'join' as View, label: strings.joinUsMenuItem, icon: <UserPlusIcon /> },
    { view: 'news' as View, label: strings.newsMenuItem, icon: <NewsIcon /> },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div
        className={`relative z-10 w-4/5 max-w-xs h-full bg-slate-900 shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 mt-4">
             <h2 className="text-2xl font-bold text-white ml-2">{strings.menu}</h2>
             <button onClick={onClose} className="text-slate-400 hover:text-white p-2 rounded-full" aria-label={strings.close}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav>
            <ul>
              {navItems.map((item) => (
                <NavItem
                  key={item.view}
                  view={item.view}
                  label={item.label}
                  icon={item.icon}
                  onNavigate={onNavigate}
                  isActive={currentView === item.view}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;