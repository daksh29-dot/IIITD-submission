import React, { useState, useEffect } from 'react';
import { User, Project, CollaborationRequest } from '../types';
import { api } from '../services/api';
import { MatchExplanationModal } from '../components/MatchExplanationModal';
import { JoinRequestModal } from '../components/JoinRequestModal';

interface HomeDashboardProps {
  currentUser: User | null;
  onNavigate: (tab: string, entityId?: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ currentUser, onNavigate }) => {
  const [recommendedPeers, setRecommendedPeers] = useState<User[]>([]);
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [inboxRequests, setInboxRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedExplanation, setSelectedExplanation] = useState<any | null>(null);
  const [selectedJoinProject, setSelectedJoinProject] = useState<Project | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [peers, projs, reqs] = await Promise.all([
        api.getRecommendedPeers(),
        api.getRecommendedProjects(),
        api.getIncomingRequests()
      ]);
      setRecommendedPeers(peers.slice(0, 4));
      setRecommendedProjects(projs.slice(0, 3));
      setInboxRequests(reqs.filter((r: CollaborationRequest) => r.status === 'Pending'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleRequestAction = async (requestId: string, status: 'Accepted' | 'Rejected') => {
    try {
      await api.updateRequestStatus(requestId, status);
      setInboxRequests(prev => prev.filter(r => r.request_id !== requestId));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner (Monotonic Slate Aesthetic) */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 p-8 text-white border border-slate-800 pixel-box shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono mb-3 border border-slate-700">
            <span>Inter-College Network Active</span>
            <span>•</span>
            <span>{currentUser?.college_name || 'Delhi Technological University'}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Aarav'}!
          </h1>
          <p className="mt-2 text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
            CampusConnect bridges your campus to passionate peers everywhere. Build multidisciplinary hackathon teams, exchange skills, and create real projects together.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('buildspace')}
              className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-mono font-bold transition shadow-sm"
            >
              Explore BuildSpace Projects
            </button>
            <button
              onClick={() => onNavigate('discover')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-semibold transition border border-slate-700"
            >
              Find Teammates
            </button>
            <button
              onClick={() => onNavigate('myprojects')}
              className="px-5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 text-xs font-mono transition border border-slate-700/60"
            >
              My Projects
            </button>
          </div>
        </div>

        {/* Decorative Dotted Grid pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:block pixel-dot-pattern"></div>
      </div>

      {/* Pending Requests Alert (FR-052 & FR-053) */}
      {inboxRequests.length > 0 && (
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-5 pixel-box">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-slate-100 animate-pulse"></span>
              <h3 className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                Pending Collaboration Requests ({inboxRequests.length})
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {inboxRequests.map((req) => (
              <div
                key={req.request_id}
                className="bg-white dark:bg-slate-800/90 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pixel-box"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-sm flex items-center justify-center">
                    {req.sender_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {req.sender_name} <span className="font-normal text-slate-500">({req.sender_college}) requested to join as</span> <span className="font-mono font-bold text-slate-900 dark:text-slate-100">[{req.role_name}]</span>
                    </p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">"{req.message}"</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleRequestAction(req.request_id, 'Accepted')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 text-xs font-mono font-semibold transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(req.request_id, 'Rejected')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition hover:bg-slate-200"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Recommended Projects (BuildSpace) & Recommended Teammates (Matching Engine) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recommended Projects looking for your skills */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Projects Looking For You</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Matched to your contribution skills & domain interests</p>
            </div>
            <button
              onClick={() => onNavigate('buildspace')}
              className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 hover:underline"
            >
              View all &rarr;
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">Loading recommendations...</div>
          ) : recommendedProjects.length === 0 ? (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 pixel-box">
              No matching open roles right now. Publish your own project idea in BuildSpace!
            </div>
          ) : (
            <div className="space-y-4">
              {recommendedProjects.map((proj) => (
                <div
                  key={proj.project_id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 pixel-box hover:border-slate-400 dark:hover:border-slate-600 transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="pixel-chip bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          by {proj.creator_name} ({proj.creator_college})
                        </span>
                      </div>
                      <h3
                        onClick={() => onNavigate('workspace', proj.project_id)}
                        className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1.5 hover:underline transition cursor-pointer"
                      >
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    {/* Match Score Badge with Breakdown Trigger */}
                    {proj.match_score && (
                      <button
                        onClick={() => setSelectedExplanation({
                          title: proj.title,
                          targetName: `${proj.creator_name}'s team`,
                          matchScore: proj.match_score,
                          roleFit: proj.role_fit,
                          interestFit: proj.interest_fit,
                          learningFit: proj.learning_fit,
                          availabilityFit: proj.availability_fit,
                          explanations: proj.explanations
                        })}
                        className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 transition pixel-box"
                        title="Click to view match explanation"
                      >
                        <span className="text-base font-mono font-extrabold text-slate-900 dark:text-slate-100">{proj.match_score}%</span>
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">Match</span>
                      </button>
                    )}
                  </div>

                  {/* Open Roles & Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.requirements?.map((req) => (
                        <span key={req.requirement_id} className="pixel-chip bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {req.role_name} ({req.skill_name})
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedJoinProject(proj)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 text-xs font-mono font-semibold transition"
                      >
                        Join Team
                      </button>
                      <button
                        onClick={() => onNavigate('workspace', proj.project_id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition"
                      >
                        Workspace
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Suggested Collaborators (Cross-College Matching) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Recommended Teammates</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complementary skills across colleges</p>
            </div>
            <button
              onClick={() => onNavigate('discover')}
              className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 hover:underline"
            >
              Browse all &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {recommendedPeers.map((peer) => (
              <div
                key={peer.user_id}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 pixel-box hover:border-slate-400 dark:hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-slate-800 dark:bg-slate-700 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
                      {peer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{peer.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{peer.college_short_name} • {peer.collaboration_mode}</p>
                    </div>
                  </div>

                  {peer.match_score && (
                    <button
                      onClick={() => setSelectedExplanation({
                        title: `Match with ${peer.name}`,
                        targetName: peer.name,
                        matchScore: peer.match_score,
                        roleFit: peer.role_fit,
                        interestFit: peer.interest_fit,
                        learningFit: peer.learning_fit,
                        availabilityFit: peer.availability_fit,
                        explanations: peer.explanations
                      })}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-[11px] font-mono font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      {peer.match_score}% Match
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-1">{peer.headline}</p>

                {/* Human-readable explanation snippet */}
                {peer.summary_explanation && (
                  <p className="mt-2 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2 rounded border border-slate-200 dark:border-slate-700 leading-snug">
                    {peer.summary_explanation.split('•')[0]}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {peer.skills?.slice(0, 3).map((sk) => (
                      <span key={sk.skill_id} className="pixel-chip bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {sk.name}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onNavigate('discover')}
                    className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 hover:underline"
                  >
                    Connect &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedExplanation && (
        <MatchExplanationModal
          isOpen={true}
          onClose={() => setSelectedExplanation(null)}
          {...selectedExplanation}
        />
      )}

      {selectedJoinProject && (
        <JoinRequestModal
          isOpen={true}
          onClose={() => setSelectedJoinProject(null)}
          project={selectedJoinProject}
          onSuccess={() => {
            loadData();
          }}
        />
      )}
    </div>
  );
};
