import React, { useState } from 'react';
import { User } from '../types';

interface LandingPageProps {
  onNavigate: (tab: string, entityId?: string) => void;
  currentUser: User | null;
  onUserSwitch: (user: User) => void;
  demoUsers: User[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  currentUser,
  onUserSwitch,
  demoUsers
}) => {
  // Live Match Simulator State
  const [selectedRole, setSelectedRole] = useState<'frontend' | 'ai' | 'backend' | 'design' | 'embedded'>('frontend');
  const [activeStep, setActiveStep] = useState<number>(0);

  // Dynamic simulation profiles based on SRS 4.4 formula
  const simulatorProfiles = {
    frontend: {
      partner: 'Priya Patel',
      college: 'IIT Delhi',
      partnerRole: 'AI & Computer Vision Researcher',
      partnerSkills: ['PyTorch', 'Computer Vision', 'FastAPI'],
      matchScore: 94,
      roleFit: 0.95,
      interestFit: 0.90,
      learningFit: 0.95,
      availabilityFit: 0.95,
      explanation: 'You provide client frontend architecture while Priya develops edge vision transformers. Both share an interest in MedTech applications.',
      suggestedProject: 'MedScan AI — Preliminary Radiograph Screening'
    },
    ai: {
      partner: 'Aarav Sharma',
      college: 'Delhi Technological University',
      partnerRole: 'Backend Systems & Distributed DBs',
      partnerSkills: ['Java', 'FastAPI', 'PostgreSQL', 'Docker'],
      matchScore: 92,
      roleFit: 0.92,
      interestFit: 0.90,
      learningFit: 0.90,
      availabilityFit: 0.95,
      explanation: 'Aarav provides robust microservice endpoints and caching to serve your ML models with under 50ms latency.',
      suggestedProject: 'MedScan AI & Vision Inference Pipeline'
    },
    backend: {
      partner: 'Rohan Mehta',
      college: 'BITS Pilani',
      partnerRole: 'Frontend & Design System Architect',
      partnerSkills: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
      matchScore: 96,
      roleFit: 0.98,
      interestFit: 0.95,
      learningFit: 0.90,
      availabilityFit: 1.0,
      explanation: 'Complementary pair: Rohan creates responsive interfaces while you build performant API schemas and relational data structures.',
      suggestedProject: 'CampusCred — Verifiable Micro-Credentials'
    },
    design: {
      partner: 'Ananya Sengupta',
      college: 'IIIT Hyderabad',
      partnerRole: 'NLP & Accessibility Specialist',
      partnerSkills: ['Python', 'Transformers', 'WCAG', 'PyTorch'],
      matchScore: 89,
      roleFit: 0.90,
      interestFit: 0.88,
      learningFit: 0.85,
      availabilityFit: 0.92,
      explanation: 'Your UX flows integrate with Ananya’s multimodal multilingual models for intuitive assistive tools.',
      suggestedProject: 'OpenCurriculum — Peer Learning Platform'
    },
    embedded: {
      partner: 'Vikram Joshi',
      college: 'NSUT Delhi',
      partnerRole: 'DevOps & Cloud Systems Lead',
      partnerSkills: ['Docker', 'Kubernetes', 'MQTT', 'Go'],
      matchScore: 91,
      roleFit: 0.92,
      interestFit: 0.88,
      learningFit: 0.92,
      availabilityFit: 0.90,
      explanation: 'Hardware meets scalable infrastructure: Connect your sensor microcontrollers to Vikram’s telemetry ingestion clusters.',
      suggestedProject: 'EcoSense IoT — Campus Air & Power Grid'
    }
  };

  const currentSimulation = simulatorProfiles[selectedRole];

  const journeySteps = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Who shares my interests?',
      desc: 'Browse student profiles across institutions. Filter by verified affiliation, technical skills, learning goals, and availability.',
      highlight: 'Cross-Campus Search (FR-010)'
    },
    {
      num: '02',
      title: 'Connect',
      tagline: 'Who complements my skills?',
      desc: 'Our rule-based engine pairs complementary skill sets using the SRS 4.4 formula with transparent, human-readable explanations.',
      highlight: 'Explainable Match Engine (FR-014)'
    },
    {
      num: '03',
      title: 'Build',
      tagline: 'What can we create together?',
      desc: 'Publish project ideas in BuildSpace, define open roles, accept applicants, and track progress with Kanban boards and milestones.',
      highlight: 'BuildSpace Workspaces (FR-017, FR-026)'
    },
    {
      num: '04',
      title: 'Grow',
      tagline: 'What can we learn and ship?',
      desc: 'Exchange skills 1-on-1 through SkillShare peer mentorship, coordinate joint club initiatives, and showcase completed software.',
      highlight: 'SkillShare & Showcase (FR-029, FR-037)'
    }
  ];

  return (
    <div className="space-y-24 py-8 animate-in fade-in duration-300 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Breathable, Clean Hero Section */}
      <section className="pt-8 pb-4 text-center max-w-3xl mx-auto space-y-6">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-mono text-slate-600 dark:text-slate-300 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-100"></span>
          <span>Cross-College Student Collaboration</span>
        </div>

        {/* Clean, Non-Clustered Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12]">
          Build together, <br />
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            from the ground up.
          </span>
        </h1>

        {/* Breathable Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          GroundUp connects students across universities to form balanced project teams, exchange complementary skills, and ship real innovations.
        </p>

        {/* 2 Focused CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-xs font-mono font-bold tracking-wide transition shadow-sm"
          >
            Enter GroundUp &rarr;
          </button>
          <button
            onClick={() => onNavigate('buildspace')}
            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 transition"
          >
            Explore Projects
          </button>
        </div>

        {/* Quiet, Minimalist Metrics Strip */}
        <div className="pt-10 flex items-center justify-center gap-6 sm:gap-12 text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto">
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-100 block">5+</span>
            <span className="text-[11px] font-mono uppercase tracking-wider">Universities</span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-100 block">14+</span>
            <span className="text-[11px] font-mono uppercase tracking-wider">Active Builds</span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-100 block">85+</span>
            <span className="text-[11px] font-mono uppercase tracking-wider">Builders</span>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <span className="font-mono text-2xl font-bold text-slate-900 dark:text-slate-100 block">94%</span>
            <span className="text-[11px] font-mono uppercase tracking-wider">Fit Score</span>
          </div>
        </div>
      </section>

      {/* Interactive Match Simulator Section (Clean, Dedicated Card) */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Live Interactive Simulator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            See Who Complements Your Skills
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Powered by the SRS Section 4.4 weighted match formula: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">M = 100(0.50R + 0.20I + 0.15L + 0.15A)</span>
          </p>
        </div>

        {/* Clean Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {[
            { id: 'frontend', label: 'Frontend Dev' },
            { id: 'ai', label: 'AI/ML Specialist' },
            { id: 'backend', label: 'Backend Architect' },
            { id: 'design', label: 'UI/UX Designer' },
            { id: 'embedded', label: 'Systems & IoT' },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition border ${
                selectedRole === role.id
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>

        {/* Dynamic Simulation Result Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-4xl mx-auto shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left: Matched Peer Profile */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-mono font-bold flex items-center justify-center text-lg">
                  {currentSimulation.partner.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {currentSimulation.partner}
                    </h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {currentSimulation.college}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentSimulation.partnerRole}
                  </p>
                </div>
              </div>

              {/* Natural-Language Match Rationale (FR-014) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-mono font-bold text-[10px] uppercase text-slate-400 dark:text-slate-500 block mb-1">
                  Why you match
                </span>
                {currentSimulation.explanation}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-400 mr-1">Skills:</span>
                {currentSimulation.partnerSkills.map((sk) => (
                  <span key={sk} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Score & Formula Fit Breakdown */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Match Fit</span>
                <span className="font-mono text-2xl font-black text-slate-900 dark:text-slate-100">
                  {currentSimulation.matchScore}%
                </span>
              </div>

              <div className="space-y-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <div>
                  <div className="flex justify-between">
                    <span>Role Fit (50%)</span>
                    <span className="font-bold">{Math.round(currentSimulation.roleFit * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full" style={{ width: `${currentSimulation.roleFit * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Interests (20%)</span>
                    <span className="font-bold">{Math.round(currentSimulation.interestFit * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full" style={{ width: `${currentSimulation.interestFit * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Learning Goals (15%)</span>
                    <span className="font-bold">{Math.round(currentSimulation.learningFit * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full" style={{ width: `${currentSimulation.learningFit * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Availability (15%)</span>
                    <span className="font-bold">{Math.round(currentSimulation.availabilityFit * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-slate-900 dark:bg-slate-100 rounded-full" style={{ width: `${currentSimulation.availabilityFit * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('discover')}
                className="w-full mt-2 py-2 text-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-mono font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition"
              >
                Connect in App &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How GroundUp Works: 4-Step Journey */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            The Collaboration Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            How GroundUp Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            A student-centered journey designed to take ideas from concept to shipped builds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((step, idx) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div>
                <span className="font-mono text-xl font-black block opacity-40">
                  {step.num}
                </span>
                <h3 className="text-base font-bold font-mono tracking-tight mt-1">
                  {step.title}
                </h3>
                <p className={`text-xs mt-1 font-medium ${activeStep === idx ? 'text-slate-300 dark:text-slate-700' : 'text-slate-500 dark:text-slate-400'}`}>
                  {step.tagline}
                </p>
                <p className={`text-xs mt-3 leading-relaxed ${activeStep === idx ? 'text-slate-200 dark:text-slate-800' : 'text-slate-600 dark:text-slate-400'}`}>
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/20 dark:border-slate-700/20">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold block ${activeStep === idx ? 'text-slate-300 dark:text-slate-700' : 'text-slate-400 dark:text-slate-500'}`}>
                  {step.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Active Cross-Campus Builds
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real projects recruiting student collaborators right now.
            </p>
          </div>
          <button
            onClick={() => onNavigate('buildspace')}
            className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 hover:underline"
          >
            All Builds &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Build 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  AI / Healthcare
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                  Recruiting
                </span>
                <span className="text-xs text-slate-400 font-mono">IIT Delhi</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                MedScan AI — Preliminary Radiograph Screening
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lightweight vision transformer deployed to assist clinic triage in resource-constrained primary health centers.
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  FastAPI Backend (1 open)
                </span>
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  React Frontend (1 open)
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Remote • 8-10 hrs/wk</span>
              <button
                onClick={() => onNavigate('workspace', 'prj_medscan_01')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-xs font-mono font-bold transition"
              >
                Workspace &rarr;
              </button>
            </div>
          </div>

          {/* Build 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Web Systems
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                  Recruiting
                </span>
                <span className="text-xs text-slate-400 font-mono">DTU</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                CampusCred — Verifiable Student Credentials
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cryptographically verifiable proof-of-contribution for student hackathons, open source contributions, and campus societies.
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  UI/UX Designer (1 open)
                </span>
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  TypeScript Engineer (1 open)
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Hybrid • 6-8 hrs/wk</span>
              <button
                onClick={() => onNavigate('workspace', 'prj_campuscred_02')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-xs font-mono font-bold transition"
              >
                Workspace &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Bottom Call to Action */}
      <section className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to build with students across campuses?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Log into GroundUp to explore active projects, connect with peers, and create your workspace.
        </p>

        {/* Persona quick switch */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {demoUsers.map((u) => (
            <button
              key={u.user_id}
              onClick={() => {
                onUserSwitch(u);
                onNavigate('dashboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                currentUser?.user_id === u.user_id
                  ? 'bg-white text-slate-900 font-bold border-white'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span>{u.name.split(' ')[0]}</span>
              <span className="opacity-50 ml-1">({u.college_short_name})</span>
            </button>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-mono font-bold tracking-wide transition shadow-sm"
          >
            Launch GroundUp &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
