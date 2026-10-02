import React from 'react';
import { Sparkles, Database, Cpu, Compass, SlidersHorizontal } from 'lucide-react';
import { sounds } from '../utils/sound';

export const AlgorithmTabs = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'oracle',
      name: '마스터의 신탁',
      badge: '마스터 추천',
      icon: Sparkles,
      desc: '박은규 마스터의 직관과 황금 부적',
      color: 'from-amber-400 to-pink-500',
    },
    {
      id: 'bigdata',
      name: '빅데이터 통계',
      badge: '1,100회 분석',
      icon: Database,
      desc: '역대 빈출수 & 가뭄수 가중치',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'montecarlo',
      name: '10만회 AI 시뮬레이션',
      badge: '초고속 연산',
      icon: Cpu,
      desc: '몬테카를로 앙상블 분산 최적화',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'saju',
      name: 'VIP 사주·수비학',
      badge: '맞춤형',
      icon: Compass,
      desc: '생년월일 음양오행 주파수',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'profilter',
      name: '프로 정밀 필터',
      badge: '커스텀',
      icon: SlidersHorizontal,
      desc: '고정수·제외수·총합 수동 제어',
      color: 'from-amber-500 to-red-500',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300/80 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>박은규의 5대 비기 (알고리즘 엔진 선택)</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">
          현재 선택: <strong className="text-amber-300">{tabs.find(t => t.id === activeTab)?.name}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playChip();
                onSelectTab(tab.id);
              }}
              className={`relative p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                isActive
                  ? 'bg-gradient-to-b from-[#1c1f2e] to-[#12141f] border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                  : 'bg-[#0f1118]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#151824]'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isActive ? `bg-gradient-to-br ${tab.color} text-black font-black shadow-md` : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <span className={`block text-xs sm:text-sm font-black ${isActive ? 'text-amber-200' : 'text-slate-300'}`}>
                  {tab.name}
                </span>
                <span className="block text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {tab.desc}
                </span>
              </div>

              {/* Active Bottom Glow Line */}
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
