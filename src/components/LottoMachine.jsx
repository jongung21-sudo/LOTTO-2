import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, FastForward, RotateCcw, Sparkles, Disc, Flame, Check, HelpCircle } from 'lucide-react';
import { Ball } from './Ball';
import { getBallStyle } from '../utils/lottoData';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

// 45 Balls setup for rotating drum
const createDrumBalls = (width, height) => {
  const balls = [];
  const radius = 9.5;
  const drumR = width / 2 - 14;
  for (let i = 1; i <= 45; i++) {
    // Random position in the bottom half of the drum initially
    const angle = Math.PI * 0.2 + Math.random() * Math.PI * 0.6;
    const r = Math.random() * (drumR - radius - 8);
    balls.push({
      num: i,
      x: width / 2 + Math.cos(angle) * r,
      y: height / 2 + Math.sin(angle) * r + 10,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius,
      style: getBallStyle(i),
    });
  }
  return balls;
};

export const LottoMachine = ({ onApplyNumbers }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const ballsRef = useRef([]);
  const rotationRef = useRef({
    angle: 0,
    speed: 0.005, // idle speed
    targetSpeed: 0.005,
    isSpinning: false,
    lastRattleTime: 0,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 6
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [rollingBall, setRollingBall] = useState(null); // active rolling ball on chute
  const [statusMessage, setStatusMessage] = useState('황금 회전 드럼 로또 추첨기 대기 중');
  const [applied, setApplied] = useState(false);

  // Initialize Canvas & Rotating Drum Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const drumRadius = width / 2 - 14;

    ballsRef.current = createDrumBalls(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const rot = rotationRef.current;
      // Smooth speed interpolation
      rot.speed += (rot.targetSpeed - rot.speed) * 0.04;
      rot.angle = (rot.angle + rot.speed) % (Math.PI * 2);

      // Play rattle sound occasionally during high-speed spin
      if (rot.speed > 0.03 && Date.now() - rot.lastRattleTime > 130 + Math.random() * 80) {
        sounds.playDrumRattle();
        rot.lastRattleTime = Date.now();
      }

      // --- 1. Draw Rotating Drum Background Frame ---
      ctx.save();
      ctx.translate(centerX, centerY);

      // Drum outer bevel
      ctx.beginPath();
      ctx.arc(0, 0, drumRadius + 8, 0, Math.PI * 2);
      ctx.fillStyle = '#1c1507';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#c59b27';
      ctx.stroke();

      // Rotating Internal Baffles (Lifter fins - 4 gold scoops)
      for (let i = 0; i < 4; i++) {
        const finAngle = rot.angle + (i * Math.PI) / 2;
        ctx.save();
        ctx.rotate(finAngle);
        ctx.beginPath();
        ctx.moveTo(drumRadius * 0.35, 0);
        ctx.quadraticCurveTo(drumRadius * 0.7, 12, drumRadius - 2, 8);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(245, 215, 127, 0.7)';
        ctx.stroke();
        // Fin scoop lip
        ctx.beginPath();
        ctx.arc(drumRadius - 6, 8, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#fce08b';
        ctx.fill();
        ctx.restore();
      }

      // Rotating spokes (Central axis structure)
      for (let i = 0; i < 8; i++) {
        const spokeAngle = rot.angle + (i * Math.PI) / 4;
        ctx.save();
        ctx.rotate(spokeAngle);
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(drumRadius * 0.4, 0);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();

      // --- 2. Update & Draw Balls Inside Drum ---
      const balls = ballsRef.current;
      balls.forEach((ball) => {
        // Rotational drag force (balls near outer wall get lifted by rotation)
        const dx = ball.x - centerX;
        const dy = ball.y - centerY;
        const dist = Math.hypot(dx, dy);

        // Gravity pulls down
        ball.vy += 0.28;

        // Friction with rotating drum wall: tangential velocity transfer
        if (dist > drumRadius * 0.5) {
          const tangentX = -dy / dist;
          const tangentY = dx / dist;
          const wallSpeed = rot.speed * dist * 0.9;

          // Drag ball along rotation
          ball.vx += tangentX * wallSpeed * 0.15;
          ball.vy += tangentY * wallSpeed * 0.15;
        }

        // Baffle impact (simulate hitting internal scoops)
        if (rot.speed > 0.02) {
          for (let f = 0; f < 4; f++) {
            const finA = (rot.angle + (f * Math.PI) / 2) % (Math.PI * 2);
            const ballAngle = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2);
            const angleDiff = Math.abs(finA - ballAngle);
            if (angleDiff < 0.25 && dist > drumRadius * 0.35 && dist < drumRadius - 5) {
              // Fin scoops ball upward!
              ball.vy -= rot.speed * 8;
              ball.vx += rot.speed * 4;
            }
          }
        }

        // Apply friction & speed clamp
        ball.vx *= 0.97;
        ball.vy *= 0.97;

        ball.x += ball.vx;
        ball.y += ball.vy;

        // Drum boundary collision
        const newDist = Math.hypot(ball.x - centerX, ball.y - centerY);
        if (newDist + ball.radius > drumRadius) {
          const nx = (ball.x - centerX) / newDist;
          const ny = (ball.y - centerY) / newDist;

          ball.x = centerX + nx * (drumRadius - ball.radius);
          ball.y = centerY + ny * (drumRadius - ball.radius);

          // Elastic bounce
          const dot = ball.vx * nx + ball.vy * ny;
          ball.vx -= 1.6 * dot * nx;
          ball.vy -= 1.6 * dot * ny;

          ball.vx *= 0.9;
          ball.vy *= 0.9;
        }

        // Draw ball
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

        let fillCol = '#F59E0B';
        if (ball.num <= 10) fillCol = '#FBBF24';
        else if (ball.num <= 20) fillCol = '#3B82F6';
        else if (ball.num <= 30) fillCol = '#EF4444';
        else if (ball.num <= 40) fillCol = '#64748B';
        else fillCol = '#10B981';

        ctx.fillStyle = fillCol;
        ctx.fill();

        // 3D sphere gradient highlight
        const grad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3,
          ball.y - ball.radius * 0.3,
          ball.radius * 0.1,
          ball.x,
          ball.y,
          ball.radius
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.1)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // Number
        ctx.fillStyle = ball.num <= 10 ? '#000000' : '#FFFFFF';
        ctx.font = 'bold 8px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.num, ball.x, ball.y + 0.5);

        ctx.restore();
      });

      // --- 3. Central Hub & Glass Highlights ---
      ctx.save();
      // Center brass hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#c59b27';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fce08b';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#261b07';
      ctx.fill();

      // Front glass reflection arcs
      ctx.beginPath();
      ctx.arc(centerX, centerY, drumRadius - 4, -Math.PI * 0.7, -Math.PI * 0.25);
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, drumRadius - 4, Math.PI * 0.3, Math.PI * 0.55);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Pick 1 unique lotto number not already drawn
  const pickNextBall = useCallback((currentList) => {
    const available = [];
    for (let i = 1; i <= 45; i++) {
      if (!currentList.includes(i)) available.push(i);
    }
    const picked = available[Math.floor(Math.random() * available.length)];
    return picked;
  }, []);

  // Animate a single ball rolling out down the gold chute track
  const animateBallRollOut = (ballNum, step, onComplete) => {
    setRollingBall(ballNum);
    sounds.playBallRollRail();

    setTimeout(() => {
      setRollingBall(null);
      sounds.playSlotDrop();
      onComplete();
    }, 700);
  };

  // Live sequential draw: Drum rotates, lifts, and drops 1 ball per cycle
  const handleLiveDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawnNumbers([]);
    setCurrentStep(1);
    setApplied(false);
    sounds.playChip();

    // Accelerate drum rotation!
    rotationRef.current.targetSpeed = 0.085;
    setStatusMessage('🎡 황금 드럼 고속 회전 중! 볼들이 배플을 타고 텀블링됩니다...');

    let list = [];

    const drawStep = (step) => {
      if (step > 6) {
        // Complete! Slow down drum to gentle spin
        rotationRef.current.targetSpeed = 0.005;
        setIsDrawing(false);
        setStatusMessage('🎉 제 6구 배출 완료! 박은규 마스터의 인생역전 6수가 완성되었습니다!');
        sounds.playJackpot();
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#EC4899', '#3B82F6', '#10B981'],
        });
        return;
      }

      setStatusMessage(`🔄 드럼 회전 중... 제 ${step}구 스쿠프 안착 및 배출 준비!`);

      setTimeout(() => {
        const nextNum = pickNextBall(list);
        const ballStyle = getBallStyle(nextNum);
        setStatusMessage(`✨ [제 ${step}구] ${nextNum}번 ${ballStyle.label}볼이 트랙으로 굴러나옵니다!`);

        // Animate rolling down chute
        animateBallRollOut(nextNum, step, () => {
          list = [...list, nextNum];
          setDrawnNumbers([...list]);
          setCurrentStep(step);

          // Schedule next ball draw after short drum spin
          setTimeout(() => {
            drawStep(step + 1);
          }, 1100);
        });
      }, 1400);
    };

    drawStep(1);
  };

  // Fast draw: Fast spins and rapid drops
  const handleFastDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setApplied(false);
    sounds.playChip();
    rotationRef.current.targetSpeed = 0.12;
    setStatusMessage('⚡ 초고속 드럼 회전 가동!');

    setTimeout(() => {
      const full = [];
      while (full.length < 6) {
        const n = Math.floor(Math.random() * 45) + 1;
        if (!full.includes(n)) full.push(n);
      }
      full.sort((a, b) => a - b);

      setDrawnNumbers(full);
      setCurrentStep(6);
      rotationRef.current.targetSpeed = 0.005;
      setIsDrawing(false);
      setStatusMessage('🎉 6구 회전 추첨 완료! 즉시 확인 가능합니다.');
      sounds.playJackpot();
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.5 },
      });
    }, 1200);
  };

  // Reset drum
  const handleReset = () => {
    if (isDrawing) return;
    sounds.playChip();
    rotationRef.current.targetSpeed = 0.005;
    setDrawnNumbers([]);
    setCurrentStep(0);
    setRollingBall(null);
    setStatusMessage('황금 회전 드럼 로또 추첨기 대기 중');
  };

  // Apply to Game A
  const handleApplyToSlip = () => {
    if (drawnNumbers.length < 6) return;
    sounds.playChip();
    onApplyNumbers([...drawnNumbers].sort((a, b) => a - b));
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 my-6">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#141724] via-[#0d101a] to-[#080910] border-2 border-amber-500/40 p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-pink-500 to-amber-600 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <div className="w-full h-full bg-[#0b0e17] rounded-[10px] flex items-center justify-center">
                <Disc className={`w-4 h-4 text-amber-400 ${isDrawing ? 'animate-spin' : ''}`} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-amber-200 tracking-tight flex items-center gap-1.5">
                  <span>박은규의 황금 회전 드럼 추첨기</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ROTATING DRUM LOTTO 6/45
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                실제 로또 추첨기처럼 드럼이 회전하며 볼이 스쿠프에 걸려 굴러 나오는 회전식 메커니즘
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isDrawing ? 'bg-amber-400 animate-ping' : 'bg-amber-400'}`} />
              <span>{isDrawing ? '드럼 회전 추첨 진행 중' : '회전 드럼 대기'}</span>
            </span>
          </div>
        </div>

        {/* Central Rotating Drum & Exit Track Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 my-4">
          
          {/* Left: Mechanical Drum Stand & Rotating Chamber */}
          <div className="relative shrink-0 flex flex-col items-center">
            
            {/* Top Gear / Turning Wheel Motif */}
            <div className="flex items-center gap-2 -mb-2 z-10">
              <div className="w-6 h-3 bg-gradient-to-r from-amber-600 to-amber-300 rounded-t-sm border-t border-amber-200" />
            </div>

            {/* Rotating Drum Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-br from-amber-200 via-amber-600 to-amber-950 shadow-[0_0_40px_rgba(212,175,55,0.4)] border-4 border-amber-400">
              
              {/* Inner Drum Body */}
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#15120a] to-[#090704] relative border-2 border-amber-200/50 shadow-inner">
                
                {/* HTML5 Canvas with Rotating Fins & 45 Tumbling Balls */}
                <canvas
                  ref={canvasRef}
                  width={270}
                  height={270}
                  className="w-full h-full block select-none cursor-pointer"
                  title="드럼을 클릭하면 회전합니다"
                  onClick={() => {
                    if (!isDrawing) {
                      sounds.playChip();
                      rotationRef.current.targetSpeed = rotationRef.current.targetSpeed > 0.02 ? 0.005 : 0.06;
                    }
                  }}
                />

                {/* Exit Chute Scoop at Right Edge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-gradient-to-l from-amber-400/80 to-transparent border-r-2 border-amber-200 rounded-l-md pointer-events-none" />
              </div>

              {/* Decorative Drum Rivets */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  style={{ transform: `rotate(${deg}deg) translate(0, -135px)` }}
                  className="absolute top-1/2 left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 border border-amber-950 shadow-sm pointer-events-none"
                />
              ))}
            </div>

            {/* Mechanical Stand Base */}
            <div className="w-48 h-6 bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900 rounded-b-2xl border-x-2 border-b-2 border-amber-300 shadow-2xl -mt-1 flex items-center justify-center">
              <span className="text-[9px] font-black text-amber-950 uppercase tracking-widest font-mono">
                PARK EUN GYU ROTATING DRUM
              </span>
            </div>
          </div>

          {/* Right: Exit Track & 6-Ball Live Rack */}
          <div className="flex-1 w-full flex flex-col justify-between bg-black/40 border border-slate-800 rounded-2xl p-4 sm:p-5 relative">
            
            {/* Announcer Live Dialogue */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 text-center mb-4 min-h-[48px] flex items-center justify-center shadow-inner">
              <p className="text-xs sm:text-sm font-bold text-amber-200">
                {statusMessage}
              </p>
            </div>

            {/* Simulated Animated Golden Rolling Rail Track */}
            <div className="relative mb-5 p-3 rounded-xl bg-gradient-to-r from-[#17140b] via-[#1f1a10] to-[#17140b] border border-amber-500/30 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-amber-300/80 font-bold mb-2">
                <span>황금 롤링 트랙 (BALL SLIDE RAIL)</span>
                <span className="text-[10px] text-slate-400">드럼에서 굴러 나오는 순간</span>
              </div>

              {/* Physical Rail Graphic */}
              <div className="relative h-14 bg-black/60 rounded-lg border border-amber-500/20 flex items-center px-4 overflow-hidden">
                {/* Two parallel gold brass rails */}
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <div className="absolute left-0 right-0 top-9 h-0.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />

                {/* Animated Ball Rolling Across Rail */}
                {rollingBall ? (
                  <div className="relative z-10 animate-[slideRight_0.7s_cubic-bezier(0.25,1,0.5,1)_forwards] flex items-center">
                    <Ball number={rollingBall} size="md" />
                    <span className="ml-2 text-xs font-black text-amber-300 animate-pulse">
                      굴러나오는 중...
                    </span>
                  </div>
                ) : (
                  <div className="w-full text-center text-xs text-slate-500 italic">
                    {isDrawing ? '다음 볼이 회전 스쿠프에 걸려 진입 중...' : '회전 시작 시 볼이 트랙을 타고 굴러나옵니다'}
                  </div>
                )}
              </div>
            </div>

            {/* 6 Extraction Racks (1구 ~ 6구) */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-2">
                <span>최종 배출 거치대 (LIVE HOLDER)</span>
                <span className="text-amber-400 font-mono font-bold">{drawnNumbers.length} / 6구</span>
              </div>

              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
                  const num = drawnNumbers[slotIdx];
                  return (
                    <div
                      key={slotIdx}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#111420] border border-amber-500/20 shadow-sm min-h-[82px] justify-center"
                    >
                      <span className="text-[10px] text-slate-400 font-bold">
                        {slotIdx + 1}구
                      </span>

                      {num ? (
                        <div className="animate-in zoom-in-75 duration-300">
                          <Ball number={num} size="md" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 font-bold text-xs select-none">
                          ?
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleLiveDraw}
                  disabled={isDrawing}
                  className={`py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isDrawing
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-400 via-pink-500 to-amber-400 text-black hover:scale-[1.02] active:scale-98 border border-amber-200'
                  }`}
                >
                  <Disc className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />
                  <span>🎡 드럼 회전 추첨 시작 (6구 순차 배출)</span>
                </button>

                <button
                  onClick={handleFastDraw}
                  disabled={isDrawing}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
                >
                  <FastForward className="w-4 h-4" />
                  <span>⏩ 쾌속 회전 즉시 추첨</span>
                </button>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  disabled={isDrawing || drawnNumbers.length === 0}
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>드럼 초기화 (볼 재투입)</span>
                </button>

                {drawnNumbers.length === 6 && (
                  <button
                    onClick={handleApplyToSlip}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    {applied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{applied ? 'A게임에 적용 완료!' : 'A게임(슬립)에 이 번호 적용'}</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Footnote */}
        <div className="mt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <span>* 본 회전 드럼 추첨기는 실제 회전 배플과 원심력 물리 엔진을 기반으로 설계되어 완벽한 텀블링과 공정한 추첨을 제공합니다.</span>
        </div>

      </div>
    </section>
  );
};
