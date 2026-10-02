import React from 'react';
import { X, Crown, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';
import { sounds } from '../utils/sound';

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-[#0f121d] border border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(212,175,55,0.3)] animate-in fade-in zoom-in-95 duration-200">
        
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

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP 1,000,000₩ EDITION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black gold-gradient-text">
            박은규의 인생역전기 스토리
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            왜 100만원의 가치를 지닌 하이엔드 복권 솔루션인가?
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Section 1: The Master & The Pink Ribbon */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/30 to-amber-950/30 border border-pink-500/30 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400/30" />
            </div>
            <div>
              <h4 className="font-bold text-pink-200 mb-1">인생역전 마스터 박은규의 핑크 리본</h4>
              <p className="text-slate-300 text-xs leading-normal">
                정수리에 묶인 시그니처 핑크 리본은 우주의 1등 당첨 주파수와 공명하는 안테나 역할을 합니다. 마스터 박은규의 확고한 눈빛과 카리스마는 흔들리는 일상에 강력한 역전의 확신을 불어넣습니다.
              </p>
            </div>
          </div>

          {/* Section 2: 5 Secret Arts */}
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>100만원 프리미엄 5대 킬러 비기</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li><strong>마스터의 신탁</strong>: 직관과 황금 인생역전 부적 카드 자동 발급</li>
              <li><strong>빅데이터 통계 분석</strong>: 1,100여 회 기출 가중치와 가뭄수 밸런스</li>
              <li><strong>10만회 몬테카를로 AI</strong>: 실시간 난수 연산으로 분산 최적화</li>
              <li><strong>VIP 사주·수비학 매칭</strong>: 본명과 생년월일의 오행 주파수 동기화</li>
              <li><strong>프로 커스텀 정밀 필터</strong>: 1~5개 고정수, 1~15개 제외수 수동 제어</li>
            </ul>
          </div>

          {/* Section 3: Gold Receipt & Backtesting */}
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
            <h4 className="font-bold text-sky-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              <span>실전 유틸리티 & 백테스팅 검증</span>
            </h4>
            <p className="text-xs text-slate-300">
              실제 동행복권 규격의 <strong>[VIP 골드 영수증]</strong>을 생성하여 고화질 이미지(PNG)로 다운로드할 수 있으며, 역대 로또 당첨 데이터와의 <strong>[백테스팅]</strong>을 통해 실제 당첨 적중률을 한눈에 확인할 수 있습니다.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            * 로또 6/45는 건전한 오락입니다. 당첨 확률은 통계적 분석과 마스터의 직관을 바탕으로 합니다.
          </p>
          <button
            onClick={() => {
              sounds.playChip();
              onClose();
            }}
            className="mt-4 w-full py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-sm hover:bg-amber-400 cursor-pointer transition-all"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
