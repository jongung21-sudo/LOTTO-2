import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, BarChart2, Receipt, Flame, Dice5, Sliders } from 'lucide-react';
import { Ball } from './Ball';
import { sounds } from '../utils/sound';

export const LottoBoard = ({
  games,
  activeTab,
  onGenerate,
  isRolling,
  onOpenReceipt,
  onOpenBacktest,
  onOpenFilter,
  sajuParams,
  setSajuParams,
  monteProgress,
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleCopySingle = (index, numbers) => {
    sounds.playChip();
    navigator.clipboard.writeText(numbers.join(', '));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAll = () => {
    sounds.playChip();
    const text = games
      .map((g) => `${g.label} [${g.type}]: ${g.numbers.join(', ')} (합계:${g.sum}, 홀짝:${g.oddEven})`)
      .join('\n');
    navigator.clipboard.writeText(`[박은규의 인생역전기 5게임]\n${text}`);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const getButtonTitle = () => {
    switch (activeTab) {
      case 'oracle':
        return '✨ 박은규 마스터의 신탁 번호 추첨하기 (황금 부적 갱신)';
      case 'bigdata':
        return '📊 빅데이터 1,100회 통계 가중 조합 산출하기';
      case 'montecarlo':
        return '⚡ 10만 회 AI 몬테카를로 시뮬레이션 가동';
      case 'saju':
        return '🔮 VIP 맞춤 사주·수비학 주파수 번호 추출';
      case 'profilter':
        return '⚙️ 프로 커스텀 정밀 필터링 조합 생성';
      default:
        return '번호 추첨하기';
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 my-4">
      {/* Saju inputs if Saju tab is selected */}
      {activeTab === 'saju' && (
        <div className="mb-4 p-4 rounded-2xl bg-[#121520] border border-purple-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-300">VIP 고객 정보 입력:</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-slate-400">성함:</label>
              <input
                type="text"
                value={sajuParams.name}
                onChange={(e) => setSajuParams({ ...sajuParams, name: e.target.value })}
                className="px-2.5 py-1 text-xs rounded-lg bg-black/50 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 w-28"
                placeholder="홍길동"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-slate-400">생년월일:</label>
              <input
                type="date"
                value={sajuParams.birthDate}
                onChange={(e) => setSajuParams({ ...sajuParams, birthDate: e.target.value })}
                className="px-2.5 py-1 text-xs rounded-lg bg-black/50 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Pro filter trigger if ProFilter tab is selected */}
      {activeTab === 'profilter' && (
        <div className="mb-4 p-4 rounded-2xl bg-[#1a120d] border border-amber-500/30 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-300 block">프로 필터 커스텀 제어판</span>
            <span className="text-[11px] text-slate-400">고정수, 제외수, 홀짝 비율, 합계 범위를 직접 맞춤 지정하세요.</span>
          </div>
          <button
            onClick={() => {
              sounds.playChip();
              onOpenFilter();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 cursor-pointer shadow-md"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>필터 조건 설정</span>
          </button>
        </div>
      )}

      {/* Monte Carlo Progress Bar */}
      {isRolling && activeTab === 'montecarlo' && (
        <div className="mb-4 p-4 rounded-2xl bg-black/70 border border-emerald-500/40">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1.5">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              100,000회 몬테카를로 앙상블 난수 연산 중...
            </span>
            <span>{monteProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-emerald-900">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 transition-all duration-150"
              style={{ width: `${monteProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="relative mb-6">
        <button
          onClick={onGenerate}
          disabled={isRolling}
          className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wide uppercase transition-all duration-300 cursor-pointer shadow-2xl relative overflow-hidden group ${
            isRolling
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 via-pink-500 to-amber-400 text-black hover:scale-[1.01] active:scale-[0.99] border-2 border-amber-200'
          }`}
        >
          {/* Shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="relative z-10 flex items-center justify-center gap-3">
            <Dice5 className={`w-5 h-5 sm:w-6 sm:h-6 ${isRolling ? 'animate-spin' : ''}`} />
            <span className="font-extrabold">{getButtonTitle()}</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Games List (A to E) */}
      <div className="bg-[#0b0d14]/90 border border-amber-500/20 rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              박은규의 인생역전 VIP 5게임 (A~E SLIP)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              {allCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{allCopied ? '복사 완료!' : '전체 5게임 복사'}</span>
            </button>
          </div>
        </div>

        {/* 5 Game Rows */}
        <div className="space-y-3">
          {games.map((game, idx) => (
            <div
              key={game.label || idx}
              className="group relative flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#111420] via-[#141827] to-[#111420] border border-slate-800/80 hover:border-amber-500/40 transition-all shadow-sm"
            >
              {/* Game Label & Mode */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center shadow-md">
                  <span className="w-full h-full bg-[#0d0f15] rounded-[10px] flex items-center justify-center font-black text-amber-300 text-sm">
                    {game.label}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    {game.type}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>합계: <strong className="text-amber-300">{game.sum}</strong></span>
                    <span>•</span>
                    <span>홀짝: <strong className="text-sky-300">{game.oddEven}</strong></span>
                  </div>
                </div>
              </div>

              {/* 6 Lotto Balls */}
              <div className="flex items-center gap-2 sm:gap-2.5 my-1 sm:my-0">
                {game.numbers.map((num, ballIdx) => (
                  <Ball
                    key={ballIdx}
                    number={num}
                    delay={ballIdx * 80}
                    isRolling={isRolling}
                    size="md"
                  />
                ))}
              </div>

              {/* Row Action Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  onClick={() => handleCopySingle(idx, game.numbers)}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border border-slate-800 text-xs transition-all cursor-pointer"
                  title="이 게임 번호 복사"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer of Board */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>동행복권 6/45 공식 규격 1~45 (중복 배제 및 오름차순 정렬 완료)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playChip();
                onOpenReceipt();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs transition-all cursor-pointer shadow-md"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>VIP 골드 영수증 발급</span>
            </button>

            <button
              onClick={() => {
                sounds.playChip();
                onOpenBacktest();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
              <span>과거 당첨 백테스팅</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
