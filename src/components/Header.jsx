import React, { useState, useEffect } from 'react';
import { Crown, Volume2, VolumeX, Sparkles, Receipt, BarChart3, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

export const Header = ({ onOpenReceipt, onOpenBacktest, onOpenAbout, soundEnabled, setSoundEnabled }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Calculate next Saturday 20:45 (Lotto 6/45 draw time in Korea)
      const target = new Date(now);
      const day = now.getDay();
      let diffDays = (6 - day + 7) % 7;
      if (diffDays === 0 && (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() >= 45))) {
        diffDays = 7;
      }
      target.setDate(now.getDate() + diffDays);
      target.setHours(20, 45, 0, 0);

      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}시간 ${minutes}분 ${seconds}초`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07080a]/90 border-b border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f14] rounded-[10px] flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight gold-gradient-text">
                박은규의 인생역전기
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest text-amber-300 bg-amber-950/80 border border-amber-500/40 rounded-full uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                VIP 100만₩ 솔루션
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>행운의 마스터 박은규의 절대신탁 에디션</span>
            </p>
          </div>
        </div>

        {/* Action Controls & D-day */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Next Draw Timer (Desktop) */}
          <div className="hidden md:flex flex-col items-end px-3 py-1 bg-amber-950/30 border border-amber-500/30 rounded-lg">
            <span className="text-[10px] text-amber-400/80 uppercase tracking-wider font-semibold">
              제1146회 추첨까지
            </span>
            <span className="text-xs font-mono font-bold text-amber-200">
              {timeLeft || '계산 중...'}
            </span>
          </div>

          {/* Gold Receipt Trigger */}
          <button
            onClick={() => {
              sounds.playChip();
              onOpenReceipt();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 bg-gradient-to-r from-amber-950/80 to-[#1e1708] border border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            title="골드 복권 영수증 발급 및 이미지 저장"
          >
            <Receipt className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">골드 영수증</span>
          </button>

          {/* Backtesting Simulator Trigger */}
          <button
            onClick={() => {
              sounds.playChip();
              onOpenBacktest();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-slate-900 border border-slate-700 hover:border-amber-500/50 hover:text-amber-200 transition-all cursor-pointer"
            title="역대 당첨 백테스팅 시뮬레이션"
          >
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">백테스팅</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-amber-950/50 border-amber-500/40 text-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? '사운드 켜짐' : '사운드 꺼짐'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* About / Help */}
          <button
            onClick={() => {
              sounds.playChip();
              onOpenAbout();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer"
            title="박은규의 인생역전기 안내"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
