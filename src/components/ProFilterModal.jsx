import React, { useState } from 'react';
import { X, Check, Sliders, RotateCcw, AlertTriangle } from 'lucide-react';
import { sounds } from '../utils/sound';

export const ProFilterModal = ({ isOpen, onClose, filterParams, onSaveFilter }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState('fixed'); // 'fixed' | 'excluded'
  const [fixed, setFixed] = useState(filterParams.fixedNumbers || []);
  const [excluded, setExcluded] = useState(filterParams.excludedNumbers || []);
  const [minSum, setMinSum] = useState(filterParams.minSum || 100);
  const [maxSum, setMaxSum] = useState(filterParams.maxSum || 175);

  const toggleNumber = (num) => {
    sounds.playChip();
    if (mode === 'fixed') {
      if (fixed.includes(num)) {
        setFixed(fixed.filter((n) => n !== num));
      } else {
        if (fixed.length >= 5) {
          alert('고정수는 최대 5개까지만 선택 가능합니다.');
          return;
        }
        // Remove from excluded if present
        setExcluded(excluded.filter((n) => n !== num));
        setFixed([...fixed, num].sort((a, b) => a - b));
      }
    } else {
      if (excluded.includes(num)) {
        setExcluded(excluded.filter((n) => n !== num));
      } else {
        if (excluded.length >= 15) {
          alert('제외수는 최대 15개까지만 선택 가능합니다.');
          return;
        }
        // Remove from fixed if present
        setFixed(fixed.filter((n) => n !== num));
        setExcluded([...excluded, num].sort((a, b) => a - b));
      }
    }
  };

  const handleReset = () => {
    sounds.playChip();
    setFixed([]);
    setExcluded([]);
    setMinSum(100);
    setMaxSum(175);
  };

  const handleApply = () => {
    sounds.playChip();
    onSaveFilter({
      fixedNumbers: fixed,
      excludedNumbers: excluded,
      minSum,
      maxSum,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#0e111a] border border-amber-500/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(212,175,55,0.25)] animate-in fade-in zoom-in-95 duration-200">
        
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>VIP 프로 커스텀 필터링</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100">
            고정수 및 제외수 맞춤 설정
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            원하는 번호는 무조건 포함하고, 꺼려지는 번호는 배제하는 정밀 필터링
          </p>
        </div>

        {/* Selection Mode Switch */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 mb-4">
          <button
            onClick={() => {
              sounds.playChip();
              setMode('fixed');
            }}
            className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              mode === 'fixed'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎯 고정수 선택 ({fixed.length}/5)
          </button>
          <button
            onClick={() => {
              sounds.playChip();
              setMode('excluded');
            }}
            className={`py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              mode === 'excluded'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🚫 제외수 선택 ({excluded.length}/15)
          </button>
        </div>

        {/* Current status display */}
        <div className="flex items-center justify-between text-xs mb-3 px-1 text-slate-400">
          <div>
            현재 고정수: <strong className="text-amber-400 font-bold">{fixed.length > 0 ? fixed.join(', ') : '없음'}</strong>
          </div>
          <div>
            현재 제외수: <strong className="text-red-400 font-bold">{excluded.length > 0 ? excluded.join(', ') : '없음'}</strong>
          </div>
        </div>

        {/* 1~45 Number Pad Grid */}
        <div className="grid grid-cols-9 gap-1.5 sm:gap-2 p-3 rounded-2xl bg-black/50 border border-slate-800 mb-4">
          {Array.from({ length: 45 }, (_, i) => i + 1).map((num) => {
            const isFixed = fixed.includes(num);
            const isExcluded = excluded.includes(num);

            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-black transition-all cursor-pointer select-none ${
                  isFixed
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black border-2 border-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.6)] scale-105'
                    : isExcluded
                    ? 'bg-gradient-to-br from-red-600 to-red-900 text-white opacity-40 line-through border border-red-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Sum Range Sliders */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-4 text-xs space-y-3">
          <div className="flex justify-between items-center text-slate-300 font-semibold">
            <span>6개 번호 총합 허용 구간:</span>
            <span className="text-amber-300 font-bold font-mono">{minSum} ~ {maxSum}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">최소 총합: {minSum}</label>
              <input
                type="range"
                min="80"
                max="140"
                value={minSum}
                onChange={(e) => setMinSum(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">최대 총합: {maxSum}</label>
              <input
                type="range"
                min="140"
                max="210"
                value={maxSum}
                onChange={(e) => setMaxSum(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
          >
            <Check className="w-4 h-4" />
            <span>조건 적용하고 번호 생성</span>
          </button>
        </div>

      </div>
    </div>
  );
};
