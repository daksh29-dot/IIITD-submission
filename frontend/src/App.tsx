import React, { useState, useEffect } from 'react';
import { User } from './types';
import { api, setAuthToken } from './services/api';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { HomeDashboard } from './pages/HomeDashboard';
import { DiscoverStudents } from './pages/DiscoverStudents';
import { BuildSpace } from './pages/BuildSpace';
import { MyProjectsPage } from './pages/MyProjectsPage';
import { ProjectWorkspace } from './pages/ProjectWorkspace';
import { SkillSharePage } from './pages/SkillSharePage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { StudentProfile } from './pages/StudentProfile';

const AppContent: React.FC = () => {
  // Start on landing page first as requested
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('prj_medscan_01');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [demoUsers, setDemoUsers] = useState<User[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    try {
      const [u, demos] = await Promise.all([
        api.getCurrentUser(),
        api.getDemoUsers()
      ]);
      setCurrentUser(u);
      setDemoUsers(demos);
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleNavigate = (tab: string, entityId?: string) => {
    if (tab === 'workspace' && entityId) {
      setSelectedProjectId(entityId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserSwitch = (user: User) => {
    setAuthToken(user.user_id);
    setCurrentUser(user);
    fetchUser();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onUserSwitch={handleUserSwitch}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingUser ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-2 font-mono">
              <div className="w-8 h-8 border-2 border-slate-900 dark:border-slate-100 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Connecting to inter-college network...</p>
            </div>
          </div>
        ) : (
          <>
            {currentTab === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
                currentUser={currentUser}
                onUserSwitch={handleUserSwitch}
                demoUsers={demoUsers}
              />
            )}
            {currentTab === 'dashboard' && (
              <HomeDashboard
                currentUser={currentUser}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'discover' && (
              <DiscoverStudents
                currentUser={currentUser}
              />
            )}
            {currentTab === 'buildspace' && (
              <BuildSpace
                currentUser={currentUser}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'myprojects' && (
              <MyProjectsPage
                currentUser={currentUser}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'workspace' && (
              <ProjectWorkspace
                projectId={selectedProjectId}
                currentUser={currentUser}
                onBack={() => setCurrentTab('buildspace')}
              />
            )}
            {currentTab === 'skillshare' && (
              <SkillSharePage
                currentUser={currentUser}
              />
            )}
            {currentTab === 'opportunities' && (
              <OpportunitiesPage
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'communities' && (
              <CommunitiesPage />
            )}
            {currentTab === 'showcase' && (
              <ShowcasePage />
            )}
            {currentTab === 'profile' && (
              <StudentProfile
                currentUser={currentUser}
                onProfileUpdated={fetchUser}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
