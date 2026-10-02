import React from 'react';
import { Sparkles, Compass, Clock, Palette, Award, Share2, Check } from 'lucide-react';
import { sounds } from '../utils/sound';

export const OracleAmulet = ({ amulet }) => {
  const [copied, setCopied] = React.useState(false);

  if (!amulet) return null;

  const handleCopyAmulet = () => {
    sounds.playChip();
    const text = `[박은규의 인생역전 황금 부적]\n\n계시: "${amulet.oracleMsg}"\n행운의 방위: ${amulet.luckyDirection}\n행운의 구매시간: ${amulet.luckyHour}\n행운의 색상: ${amulet.luckyColor}\n인생역전 서기지수: ${amulet.fortuneScore}\n- 마스터 박은규인(印) 보증 -`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a0e16] via-[#1a0f1d] to-[#120a17] border-2 border-amber-500/50 p-6 sm:p-7 shadow-[0_15px_40px_rgba(244,114,182,0.15)]">
        
        {/* Ornate corner motifs */}
        <div className="absolute top-2 left-2 text-amber-400/40 text-xs font-serif select-none">卍</div>
        <div className="absolute top-2 right-2 text-amber-400/40 text-xs font-serif select-none">卍</div>
        <div className="absolute bottom-2 left-2 text-amber-400/40 text-xs font-serif select-none">卍</div>
        <div className="absolute bottom-2 right-2 text-amber-400/40 text-xs font-serif select-none">卍</div>

        {/* Header of Talisman */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-amber-500 p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(244,114,182,0.5)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-200 tracking-wide flex items-center gap-2">
                <span>박은규 마스터의 인생역전 황금 부적 (神託符)</span>
              </h3>
              <p className="text-xs text-pink-300/80">마스터의 핑크 리본 서기가 깃든 1등급 행운의 신탁</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs">
              서기 지수: {amulet.fortuneScore}
            </span>
            <button
              onClick={handleCopyAmulet}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-1 transition-all cursor-pointer"
              title="부적 복사하기"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Oracle Revelation Quote */}
        <div className="my-5 p-4 rounded-xl bg-black/40 border border-pink-500/20 text-center relative">
          <p className="text-sm sm:text-base font-bold text-amber-100 italic">
            "{amulet.oracleMsg}"
          </p>
        </div>

        {/* 4 Sacred Elements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">행운의 명당 방위</span>
              <span className="text-xs font-bold text-slate-100">{amulet.luckyDirection}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-950/60 border border-pink-500/40 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">행운의 구매 시간대</span>
              <span className="text-xs font-bold text-slate-100">{amulet.luckyHour}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Palette className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">금주의 수호 색상</span>
              <span className="text-xs font-bold text-slate-100">{amulet.luckyColor}</span>
            </div>
          </div>
        </div>

        {/* Red Seal Stamp */}
        <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-slate-400">
          <span>* 본 부적은 박은규의 인생역전기 VIP 알고리즘에 의해 자동 정밀 산출되었습니다.</span>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border-2 border-red-600 bg-red-950/60 text-red-400 font-serif font-black text-xs shadow-[0_0_10px_rgba(220,38,38,0.5)] rotate-3 select-none">
            박은규<br />인(印)
          </div>
        </div>

      </div>
    </div>
  );
};
