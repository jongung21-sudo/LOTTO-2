import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { MasterChamber } from './components/MasterChamber';
import { AlgorithmTabs } from './components/AlgorithmTabs';
import { OracleAmulet } from './components/OracleAmulet';
import { LottoMachine } from './components/LottoMachine';
import { LottoBoard } from './components/LottoBoard';
import { TicketReceiptModal } from './components/TicketReceiptModal';
import { BacktestingModal } from './components/BacktestingModal';
import { ProFilterModal } from './components/ProFilterModal';
import { AboutModal } from './components/AboutModal';
import {
  generateMastersOracle,
  generateBigDataMode,
  generateMonteCarloMode,
  generateSajuMode,
  generateProFilterMode,
} from './utils/algorithms';
import { sounds } from './utils/sound';
import { MASTER_QUOTES } from './utils/lottoData';

export function App() {
  const [activeTab, setActiveTab] = useState('oracle'); // Option 3 selected by user
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [monteProgress, setMonteProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initial State: generated via Master's Oracle
  const initialData = generateMastersOracle();
  const [games, setGames] = useState(initialData.games);
  const [amulet, setAmulet] = useState(initialData.amulet);

  // Modals
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isBacktestOpen, setIsBacktestOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Custom params
  const [sajuParams, setSajuParams] = useState({
    name: 'VIP 고객님',
    birthDate: '1988-08-08',
  });
  const [filterParams, setFilterParams] = useState({
    fixedNumbers: [7],
    excludedNumbers: [4, 13],
    minSum: 110,
    maxSum: 175,
  });

  // Confetti celebration (Gold & Pink ribbons!)
  const triggerLuxuryConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#F472B6', '#D97706', '#EC4899', '#FDE68A'],
    });
  };

  const handleGenerate = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Audio effects
    if (activeTab === 'oracle') {
      sounds.playOracleChime();
    } else {
      sounds.playChip();
    }

    // Change Master quote
    setQuoteIndex((prev) => (prev + 1) % MASTER_QUOTES.length);

    // Monte Carlo simulation animation
    if (activeTab === 'montecarlo') {
      setMonteProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setMonteProgress(p);
        sounds.playBallPop(0, 1 + p / 100);
        if (p >= 100) {
          clearInterval(interval);
          finishGeneration();
        }
      }, 180);
    } else {
      // Standard roll delay
      for (let i = 0; i < 6; i++) {
        sounds.playBallPop(i * 120, 1 + i * 0.1);
      }
      setTimeout(() => {
        finishGeneration();
      }, 700);
    }
  };

  const finishGeneration = () => {
    let result = null;
    switch (activeTab) {
      case 'oracle':
        result = generateMastersOracle();
        setGames(result.games);
        setAmulet(result.amulet);
        triggerLuxuryConfetti();
        sounds.playJackpot();
        break;
      case 'bigdata':
        result = generateBigDataMode();
        setGames(result.games);
        triggerLuxuryConfetti();
        sounds.playJackpot();
        break;
      case 'montecarlo':
        result = generateMonteCarloMode();
        setGames(result.games);
        triggerLuxuryConfetti();
        sounds.playJackpot();
        break;
      case 'saju':
        result = generateSajuMode(sajuParams.name, sajuParams.birthDate);
        setGames(result.games);
        triggerLuxuryConfetti();
        sounds.playJackpot();
        break;
      case 'profilter':
        result = generateProFilterMode(filterParams);
        setGames(result.games);
        triggerLuxuryConfetti();
        sounds.playJackpot();
        break;
      default:
        result = generateMastersOracle();
        setGames(result.games);
        setAmulet(result.amulet);
    }

    setIsRolling(false);
  };

  // Switch tabs
  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    // If switching to oracle and no amulet, generate one
    if (tabId === 'oracle' && !amulet) {
      const res = generateMastersOracle();
      setAmulet(res.amulet);
    }
  };

  const handleApplyDrawnNumbers = (numbers) => {
    setGames((prev) => {
      const next = [...prev];
      if (next.length > 0) {
        next[0] = {
          ...next[0],
          type: 'A. 에어볼 라이브 추첨수',
          numbers: [...numbers].sort((a, b) => a - b),
          sum: numbers.reduce((a, b) => a + b, 0),
          oddEven: `${numbers.filter(n => n % 2 === 1).length}:${numbers.filter(n => n % 2 === 0).length}`,
        };
      }
      return next;
    });
    triggerLuxuryConfetti();
    sounds.playJackpot();
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Header */}
      <div>
        <Header
          onOpenReceipt={() => setIsReceiptOpen(true)}
          onOpenBacktest={() => setIsBacktestOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        {/* Master Chamber (Photo + Pink Ribbon Glow + Quotes) */}
        <MasterChamber
          currentQuoteIndex={quoteIndex}
          onNextQuote={() => setQuoteIndex((prev) => (prev + 1) % MASTER_QUOTES.length)}
          isGenerating={isRolling}
        />

        {/* Live Lottery Ball Drawing Machine (황금 에어볼 추첨기) */}
        <LottoMachine onApplyNumbers={handleApplyDrawnNumbers} />

        {/* 5 Secret Arts (Algorithm Tabs) */}
        <AlgorithmTabs
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />

        {/* Master's Oracle Talisman Card (Shown prominently when in Oracle mode) */}
        {activeTab === 'oracle' && (
          <OracleAmulet amulet={amulet} />
        )}

        {/* Lotto 5-Game Board */}
        <LottoBoard
          games={games}
          activeTab={activeTab}
          onGenerate={handleGenerate}
          isRolling={isRolling}
          onOpenReceipt={() => setIsReceiptOpen(true)}
          onOpenBacktest={() => setIsBacktestOpen(true)}
          onOpenFilter={() => setIsFilterOpen(true)}
          sajuParams={sajuParams}
          setSajuParams={setSajuParams}
          monteProgress={monteProgress}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-900 bg-[#060709] text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>박은규의 인생역전기 (PARK EUN-GYU: LIFE TURNAROUND LOTTO VIP)</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px]">
              1,000,000 KRW EDITION
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            시그니처 핑크 리본의 수호자 마스터 박은규 친필 보증 • 대한민국 동행복권 6/45 공식 규격 준수
          </p>
          <p className="text-[10px] text-slate-700">
            © 2026 박은규의 인생역전기. All Rights Reserved. 복권 구매는 만 19세 이상만 가능합니다.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <TicketReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        games={games}
        round={1146}
      />

      <BacktestingModal
        isOpen={isBacktestOpen}
        onClose={() => setIsBacktestOpen(false)}
        games={games}
      />

      <ProFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterParams={filterParams}
        onSaveFilter={(newParams) => {
          setFilterParams(newParams);
          // Immediately regenerate with custom filters
          const res = generateProFilterMode(newParams);
          setGames(res.games);
          triggerLuxuryConfetti();
        }}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
}

export default App;
