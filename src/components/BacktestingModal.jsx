import React, { useMemo } from 'react';
import { X, Trophy, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { HISTORICAL_DRAWS } from '../utils/lottoData';
import { sounds } from '../utils/sound';

export const BacktestingModal = ({ isOpen, onClose, games }) => {
  if (!isOpen) return null;

  // Run backtesting against HISTORICAL_DRAWS for all 5 games
  const results = useMemo(() => {
    let first = 0;
    let second = 0;
    let third = 0;
    let fourth = 0;
    let fifth = 0;
    let totalWins = 0;
    let totalWinnings = 0;

    const gameStats = games.map((g) => {
      let g1 = 0, g2 = 0, g3 = 0, g4 = 0, g5 = 0;
      HISTORICAL_DRAWS.forEach((draw) => {
        const matchCount = g.numbers.filter((n) => draw.numbers.includes(n)).length;
        const bonusMatch = g.numbers.includes(draw.bonus);

        if (matchCount === 6) {
          g1++;
          first++;
          totalWinnings += 2000000000;
        } else if (matchCount === 5 && bonusMatch) {
          g2++;
          second++;
          totalWinnings += 50000000;
        } else if (matchCount === 5) {
          g3++;
          third++;
          totalWinnings += 1500000;
        } else if (matchCount === 4) {
          g4++;
          fourth++;
          totalWinnings += 50000;
        } else if (matchCount === 3) {
          g5++;
          fifth++;
          totalWinnings += 5000;
        }
      });
      return {
        label: g.label,
        type: g.type,
        numbers: g.numbers,
        hits: { 1: g1, 2: g2, 3: g3, 4: g4, 5: g5, total: g1 + g2 + g3 + g4 + g5 },
      };
    });

    totalWins = first + second + third + fourth + fifth;

    return {
      first,
      second,
      third,
      fourth,
      fifth,
      totalWins,
      totalWinnings,
      gameStats,
      drawsCount: HISTORICAL_DRAWS.length,
    };
  }, [games]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#0e111a] border border-sky-500/30 rounded-3xl p-6 shadow-[0_0_50px_rgba(56,189,248,0.2)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playChip();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>역대 실전 빅데이터 백테스팅 시뮬레이터</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            과거 당첨 이력 검증 결과
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            현재 5개 조합을 최근 {results.drawsCount}회차 실제 로또 6/45 추첨 결과에 대입한 가상 수익 분석
          </p>
        </div>

        {/* Total Prize Highlight Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#181a26] to-sky-950/60 border border-amber-500/40 mb-6 text-center shadow-lg">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-1">
            과거 회차 누적 가상 당첨금
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-200">
            {results.totalWinnings.toLocaleString()} 원
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            총 {results.drawsCount}개 회차 중 총 <strong className="text-amber-300 font-bold">{results.totalWins}회</strong> 당첨 적중!
          </p>
        </div>

        {/* Tier Ranking Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-center">
            <span className="text-[10px] text-amber-400 font-bold block">1등 (6개)</span>
            <span className="text-base font-black text-white">{results.first} 회</span>
            <span className="text-[9px] text-slate-500 block">약 20억/회</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/40 text-center">
            <span className="text-[10px] text-sky-400 font-bold block">2등 (5+보너스)</span>
            <span className="text-base font-black text-white">{results.second} 회</span>
            <span className="text-[9px] text-slate-500 block">약 5,000만/회</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-center">
            <span className="text-[10px] text-emerald-400 font-bold block">3등 (5개)</span>
            <span className="text-base font-black text-white">{results.third} 회</span>
            <span className="text-[9px] text-slate-500 block">약 150만/회</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/40 text-center">
            <span className="text-[10px] text-purple-400 font-bold block">4등 (4개)</span>
            <span className="text-base font-black text-white">{results.fourth} 회</span>
            <span className="text-[9px] text-slate-500 block">50,000원</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-bold block">5등 (3개)</span>
            <span className="text-base font-black text-white">{results.fifth} 회</span>
            <span className="text-[9px] text-slate-500 block">5,000원</span>
          </div>
        </div>

        {/* Per-Game Breakdown */}
        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold text-slate-300 block mb-1">
            게임별(A~E) 적중 세부 현황
          </span>
          {results.gameStats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center">
                  {item.label}
                </span>
                <span className="text-slate-300 font-mono">
                  {item.numbers.join(', ')}
                </span>
              </div>
              <div className="text-slate-400">
                총 <strong className="text-amber-300 font-bold">{item.hits.total}회</strong> 적중 (4등:{item.hits[4]}회, 5등:{item.hits[5]}회)
              </div>
            </div>
          ))}
        </div>

        {/* Notice Footnote */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <span>
            백테스팅은 실제 로또 6/45 역대 기출 번호 데이터를 기반으로 산출되며, 마스터 박은규의 고유 알고리즘이 가진 역사적 당첨 적중률을 객관적으로 입증합니다.
          </span>
        </div>

        {/* Close Action */}
        <div className="mt-5">
          <button
            onClick={() => {
              sounds.playChip();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
