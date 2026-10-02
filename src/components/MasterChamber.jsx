import React, { useState } from 'react';
import { Sparkles, Heart, Crown, MessageSquare, RefreshCw } from 'lucide-react';
import { MASTER_QUOTES } from '../utils/lottoData';
import { sounds } from '../utils/sound';

export const MasterChamber = ({ currentQuoteIndex, onNextQuote, isGenerating }) => {
  const [photoLoaded, setPhotoLoaded] = useState(true);
  const quote = MASTER_QUOTES[currentQuoteIndex % MASTER_QUOTES.length];

  return (
    <section className="relative w-full max-w-4xl mx-auto my-6 px-4">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-amber-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />

      <div className="relative bg-[#0d0f15]/90 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        
        {/* Left/Center: Master Park Eun-gyu Portrait Chamber */}
        <div className="relative shrink-0 flex flex-col items-center">
          
          {/* Ornate Rotating Gold Ring */}
          <div className={`absolute -inset-3 rounded-full border border-dashed border-amber-400/40 pointer-events-none ${isGenerating ? 'animate-spin' : 'animate-[spin_20s_linear_infinite]'}`} />
          <div className="absolute -inset-1.5 rounded-full border border-amber-500/60 pointer-events-none animate-pulse" />

          {/* Portrait Container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-b from-amber-300 via-pink-400 to-amber-600 shadow-[0_0_35px_rgba(244,114,182,0.4)] overflow-visible">
            
            {/* The Signature Pink Ribbon floating badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-[10px] font-black tracking-widest text-white shadow-[0_0_12px_rgba(244,114,182,0.8)] border border-pink-200">
              <Heart className="w-3 h-3 fill-white text-white animate-pulse" />
              <span>행운의 리본</span>
            </div>

            {/* Inner Photo Frame */}
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-amber-200/50 relative">
              <img
                src="/master_park.png"
                alt="인생역전 마스터 박은규"
                className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                  isGenerating ? 'scale-115 brightness-110' : 'scale-100 hover:scale-105'
                }`}
                onError={(e) => {
                  console.warn('Image load fallback');
                }}
              />
              
              {/* Golden Ray Overlay when generating */}
              {isGenerating && (
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/40 via-pink-500/20 to-transparent animate-pulse pointer-events-none" />
              )}
            </div>

            {/* VVIP Seal Medal */}
            <div className="absolute -bottom-2 -right-1 z-20 w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#11131a] rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Master Name & Badges */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
                마스터 박은규
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                인생역전 도사
              </span>
            </div>
            <p className="text-[11px] text-pink-400 font-medium mt-0.5">
              우주 주파수 & 핑크 리본의 수호자
            </p>
          </div>
        </div>

        {/* Right: Master's Oracle Speech Box */}
        <div className="flex-1 w-full flex flex-col justify-between bg-gradient-to-br from-[#121520] to-[#181c2b] border border-amber-500/20 rounded-2xl p-5 sm:p-6 relative shadow-inner">
          
          {/* Top Title of Speech Box */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                마스터 박은규의 금주의 인생역전 계시
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 font-bold">
              {quote.type === 'spiritual' ? '영험한 도사님 톤' : quote.type === 'quant' ? '근엄한 퀀트 마스터 톤' : '하이브리드 명언'}
            </span>
          </div>

          {/* Dialogue Content */}
          <div className="my-4 min-h-[72px] flex flex-col justify-center">
            <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed tracking-normal">
              "{quote.quote}"
            </p>
            <p className="text-xs sm:text-sm text-amber-400/90 mt-2 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>{quote.sub}</span>
            </p>
          </div>

          {/* Chamber Footer with interactive button */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>실시간 인생역전 기운 충전 완료 (100% 최상)</span>
            </div>

            <button
              onClick={() => {
                sounds.playOracleChime();
                onNextQuote();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-200 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>마스터의 다른 말씀 듣기</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
