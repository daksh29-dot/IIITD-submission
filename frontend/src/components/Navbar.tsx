import React, { useState, useEffect } from 'react';
import { User, NotificationItem } from '../types';
import { api, setAuthToken } from '../services/api';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User | null;
  onUserSwitch: (user: User) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onUserSwitch
}) => {
  const [demoUsers, setDemoUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    api.getDemoUsers().then(setDemoUsers).catch(() => {});
    if (currentUser) {
      api.getNotifications().then(setNotifications).catch(() => {});
    }
  }, [currentUser]);

  const unreadCount = notifications.filter(n => !n.read_status).length;

  const handleSelectUser = (u: User) => {
    setAuthToken(u.user_id);
    onUserSwitch(u);
    setShowPersonaMenu(false);
  };

  const navItems = [
    { id: 'landing', label: 'Overview' },
    { id: 'dashboard', label: 'Feed' },
    { id: 'discover', label: 'People' },
    { id: 'buildspace', label: 'BuildSpace' },
    { id: 'myprojects', label: 'My Projects' },
    { id: 'skillshare', label: 'SkillShare' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'communities', label: 'Clubs' },
    { id: 'showcase', label: 'Showcase' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => setCurrentTab('landing')}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-mono font-black text-xs tracking-tighter">
              GU
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                GroundUp
              </span>
              <span className="block text-[8px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider -mt-0.5">
                Cross-College Collaboration
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Monotonic styling) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Theme Switcher, Persona Switcher, Notifications, Profile */}
          <div className="flex items-center space-x-2">
            {/* Theme Switcher (Light / Dark / System) */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono">
              <button
                onClick={() => setTheme('light')}
                title="Light Mode"
                className={`px-1.5 py-1 rounded transition ${
                  theme === 'light'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                ☀️
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Mode"
                className={`px-1.5 py-1 rounded transition ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-white dark:bg-slate-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                🌙
              </button>
              <button
                onClick={() => setTheme('system')}
                title="System Mode"
                className={`px-1.5 py-1 rounded transition ${
                  theme === 'system'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                💻
              </button>
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowPersonaMenu(!showPersonaMenu); setShowNotifMenu(false); }}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
                title="Switch Demo Student Persona"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-100 animate-pulse"></span>
                <span className="hidden sm:inline font-bold">
                  {currentUser?.name?.split(' ')[0] || 'Aarav'}
                </span>
                <span className="text-[10px] opacity-60">
                  ({currentUser?.college_short_name || 'DTU'})
                </span>
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-mono font-bold uppercase text-slate-400">Switch Persona (5 Colleges)</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Test cross-college discovery & permissions</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {demoUsers.map((u) => (
                      <button
                        key={u.user_id}
                        onClick={() => handleSelectUser(u)}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
                          currentUser?.user_id === u.user_id
                            ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="w-7 h-7 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-mono font-bold text-xs text-slate-800 dark:text-slate-200">
                          {u.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-slate-900 dark:text-slate-100 font-medium">{u.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-mono">
                            {u.college_short_name} • {u.headline?.split(' ')[0]}
                          </p>
                        </div>
                        {currentUser?.user_id === u.user_id && (
                          <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-slate-100">
                            [ACTIVE]
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifMenu(!showNotifMenu); setShowPersonaMenu(false); }}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 relative transition"
                title="Notifications"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">NOTIFICATIONS</span>
                    <span className="text-[10px] font-mono text-slate-500">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 p-4 text-center font-mono">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.notification_id}
                          onClick={() => {
                            api.markNotificationRead(n.notification_id);
                            setNotifications(prev => prev.map(x => x.notification_id === n.notification_id ? { ...x, read_status: true } : x));
                          }}
                          className={`px-4 py-2.5 text-xs border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition ${
                            !n.read_status ? 'bg-slate-100/60 dark:bg-slate-800/80' : ''
                          }`}
                        >
                          <p className="text-slate-800 dark:text-slate-200 leading-snug">{n.message}</p>
                          <span className="text-[10px] font-mono text-slate-400 mt-1 block">Just now</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Tab */}
            <button
              onClick={() => setCurrentTab('profile')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition border ${
                currentTab === 'profile'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-[10px] flex items-center justify-center">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-mono font-semibold hidden sm:inline">Profile</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  currentTab === item.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
