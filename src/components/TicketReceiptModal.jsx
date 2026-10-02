import React, { useRef, useState } from 'react';
import { X, Download, Copy, Check, Printer, Sparkles, Crown } from 'lucide-react';
import { toPng } from 'html-to-image';
import { getBallStyle } from '../utils/lottoData';
import { sounds } from '../utils/sound';

export const TicketReceiptModal = ({ isOpen, onClose, games, round = 1146 }) => {
  const receiptRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const now = new Date();
  const formattedDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} (${['일','월','화','수','목','금','토'][now.getDay()]}) ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    try {
      setDownloading(true);
      sounds.playChip();
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        quality: 0.95,
        backgroundColor: '#0d0f17',
      });
      const link = document.createElement('a');
      link.download = `박은규의_인생역전_골드영수증_${round}회.png`;
      link.href = dataUrl;
      link.click();
      sounds.playJackpot();
    } catch (err) {
      console.error('Failed to export ticket image', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyNumbers = () => {
    sounds.playChip();
    const text = games
      .map((g) => `${g.label} : ${g.numbers.join('  ')}`)
      .join('\n');
    navigator.clipboard.writeText(`[박은규의 인생역전 VIP 골드 영수증 - 제${round}회]\n발행: ${formattedDate}\n\n${text}\n\n* 마스터 박은규인(印) 보증`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-[#0f121d] border border-amber-500/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(212,175,55,0.3)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Close Button */}
        <button
          onClick={() => {
            sounds.playChip();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
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
            박은규의 인생역전 골드 영수증
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            실제 복권 규격을 완벽 재해석한 VIP 고화질 인증 티켓
          </p>
        </div>

        {/* The Printable / Capturable Receipt Card */}
        <div
          ref={receiptRef}
          className="relative bg-gradient-to-b from-[#161a29] via-[#10131e] to-[#0c0e17] border-2 border-amber-400/60 rounded-2xl p-6 shadow-2xl overflow-hidden font-mono text-slate-200"
        >
          {/* Subtle Watermark of Master Park */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none overflow-hidden">
            <img src="/master_park.png" alt="watermark" className="w-80 h-80 object-cover rounded-full" />
          </div>

          {/* Ticket Header */}
          <div className="text-center pb-4 border-b border-dashed border-amber-500/30">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GRAND MASTER OF LOTTO</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xl font-black text-amber-200 tracking-tight">
              박은규의 인생역전기 [VIP 골드 티켓]
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              동행복권 로또 6/45 공식 규격 호환
            </p>
          </div>

          {/* Issue Meta Info */}
          <div className="py-3 border-b border-dashed border-slate-700/60 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">발행회차:</span>
              <span className="font-bold text-amber-300">제 {round} 회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">발행일시:</span>
              <span className="text-slate-300">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">추첨일자:</span>
              <span className="text-slate-300">매주 토요일 20:45 (MBC 생방송)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">발행인:</span>
              <span className="font-bold text-pink-400">인생역전 마스터 박은규</span>
            </div>
          </div>

          {/* 5 Games Display */}
          <div className="py-4 space-y-2.5">
            {games.map((g) => (
              <div key={g.label} className="flex items-center justify-between py-1 px-2 rounded-lg bg-black/40 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-400 text-black font-black text-xs flex items-center justify-center">
                    {g.label}
                  </span>
                  <span className="text-[10px] text-slate-400 w-12 truncate font-sans">
                    {g.type.split(' ')[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {g.numbers.map((n) => {
                    const bStyle = getBallStyle(n);
                    return (
                      <span
                        key={n}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black border ${bStyle.bg} ${bStyle.border} ${bStyle.text} shadow-sm`}
                      >
                        {String(n).padStart(2, '0')}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Barcode & Seal Mockup */}
          <div className="pt-4 border-t border-dashed border-amber-500/30 flex items-center justify-between">
            <div className="space-y-1">
              {/* Fake barcode lines */}
              <div className="flex items-center gap-[2px] h-9">
                {[3,1,2,4,1,3,2,1,4,2,3,1,2,4,1,3,1,2,4,2,1,3,2,1,4,1,3,2,4,1,2,3,1,4].map((w, idx) => (
                  <div key={idx} className="bg-amber-300/80 h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest">
                VIP-777-PEK-LOTTO-100M
              </p>
            </div>

            {/* Red Royal Seal */}
            <div className="w-14 h-14 rounded-xl border-2 border-red-500 bg-red-950/70 text-red-400 flex flex-col items-center justify-center font-serif text-[11px] font-black shadow-[0_0_12px_rgba(239,68,68,0.4)] rotate-3 select-none">
              <span>박은규</span>
              <span className="text-[9px] -mt-1">인(印)</span>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="mt-3 text-center text-[10px] text-slate-400 font-sans">
            * 본 번호는 핑크 리본의 수호자 박은규 마스터의 우주 주파수로 보증되었습니다.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="w-full flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? '이미지 생성 중...' : 'PNG 영수증 이미지로 저장'}</span>
          </button>

          <button
            onClick={handleCopyNumbers}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '복사 완료!' : '텍스트 복사'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
