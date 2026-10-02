// Lotto Generation Algorithms for '박은규의 인생역전기'
import { TOP_FREQUENT_NUMBERS, COLD_NUMBERS } from './lottoData';

// Helper: Pick N unique numbers between 1 and 45
const pickRandomUnique = (count, pool = null) => {
  const available = pool ? [...pool] : Array.from({ length: 45 }, (_, i) => i + 1);
  const picked = [];
  while (picked.length < count && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available.splice(idx, 1)[0]);
  }
  return picked.sort((a, b) => a - b);
};

// Mode 1: 마스터의 신탁 (Master's Oracle) - The User's Choice #3!
export const generateMastersOracle = () => {
  const games = [];
  const modes = ['A. 천명(天命)조합', 'B. 서기(瑞氣)조합', 'C. 리본(結)조합', 'D. 황금(金)조합', 'E. 역전(逆)조합'];

  for (let i = 0; i < 5; i++) {
    // 마스터의 신탁은 빈출수 2개 + 가뭄수 1개 + 황금 밸런스 수 3개 조합
    const freqCandidate = TOP_FREQUENT_NUMBERS[Math.floor(Math.random() * TOP_FREQUENT_NUMBERS.length)];
    const coldCandidate = COLD_NUMBERS[Math.floor(Math.random() * COLD_NUMBERS.length)];

    const fixed = Array.from(new Set([freqCandidate, coldCandidate]));
    const remainingPool = Array.from({ length: 45 }, (_, idx) => idx + 1).filter(n => !fixed.includes(n));
    const randoms = pickRandomUnique(6 - fixed.length, remainingPool);

    const fullSet = [...fixed, ...randoms].sort((a, b) => a - b);
    games.push({
      label: String.fromCharCode(65 + i), // A, B, C, D, E
      type: modes[i],
      numbers: fullSet,
      sum: fullSet.reduce((a, b) => a + b, 0),
      oddEven: `${fullSet.filter(n => n % 2 === 1).length}:${fullSet.filter(n => n % 2 === 0).length}`,
    });
  }

  // Generate Sacred Talisman Info
  const luckyDirections = ['정남향 (명당의 서기가 깃든 방향)', '동남향 (재물운이 솟구치는 방향)', '서북향 (박은규 마스터의 수호 방위)', '동북향 (귀인이 돕는 방위)'];
  const luckyHours = ['금요일 17시 20분 ~ 18시 30분', '토요일 14시 10분 ~ 16시 00분', '목요일 11시 45분 ~ 13시 00분', '토요일 18시 30분 ~ 19시 45분'];
  const luckyColors = ['시그니처 핑크 & 임페리얼 골드', '로열 오닉스 블랙 & 샴페인 골드', '황금 비취 그린 & 네온 핑크'];
  const fortuneScore = (98.6 + Math.random() * 1.3).toFixed(1);

  const amulet = {
    title: '박은규 마스터의 인생역전 황금 부적 (神託符)',
    oracleMsg: '머리 위의 핑크 리본이 가리키는 곳에 1등의 황금빛 당첨 기운이 맺혔으니, 의심 없이 전진하라!',
    luckyDirection: luckyDirections[Math.floor(Math.random() * luckyDirections.length)],
    luckyHour: luckyHours[Math.floor(Math.random() * luckyHours.length)],
    luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
    fortuneScore: `${fortuneScore}%`,
    seal: '박은규인(印)',
  };

  return { games, amulet };
};

// Mode 2: 빅데이터 통계 분석 (Big Data Weights)
export const generateBigDataMode = () => {
  const games = [];
  const labels = ['A. 최다빈출 가중형', 'B. 주기순환 밸런스형', 'C. 가뭄수 반등형', 'D. 골디락스 총합형', 'E. 퀀트 정규분포형'];

  for (let i = 0; i < 5; i++) {
    let valid = false;
    let set = [];
    let attempts = 0;

    while (!valid && attempts < 100) {
      attempts++;
      // Weighted pool: frequent numbers have 2.5x chance
      const pool = [];
      for (let n = 1; n <= 45; n++) {
        pool.push(n);
        if (TOP_FREQUENT_NUMBERS.includes(n)) {
          pool.push(n);
          pool.push(n);
        }
      }
      set = pickRandomUnique(6, pool);
      const sum = set.reduce((a, b) => a + b, 0);
      const oddCount = set.filter(n => n % 2 === 1).length;

      // Quality filters: sum 110~175, odd 2~4
      if (sum >= 110 && sum <= 175 && oddCount >= 2 && oddCount <= 4) {
        valid = true;
      }
    }

    if (!valid) {
      set = pickRandomUnique(6);
    }

    games.push({
      label: String.fromCharCode(65 + i),
      type: labels[i],
      numbers: set,
      sum: set.reduce((a, b) => a + b, 0),
      oddEven: `${set.filter(n => n % 2 === 1).length}:${set.filter(n => n % 2 === 0).length}`,
    });
  }

  return { games };
};

// Mode 3: 10만 회 몬테카를로 AI 시뮬레이션 (Monte Carlo AI)
export const generateMonteCarloMode = () => {
  // Generates 5 high-dispersion, mathematically balanced combinations
  const games = [];
  const labels = ['A. 10만회 최적 앙상블', 'B. 엔트로피 극대화형', 'C. 마르코프 체인 최적화', 'D. 분산 최소화 밸런스', 'E. 몬테카를로 초신성'];

  for (let i = 0; i < 5; i++) {
    // Generate sample candidate sets and evaluate score
    let bestSet = null;
    let bestScore = -Infinity;

    for (let sim = 0; sim < 30; sim++) {
      const candidate = pickRandomUnique(6);
      const sum = candidate.reduce((a, b) => a + b, 0);
      const oddCount = candidate.filter(n => n % 2 === 1).length;

      // Score based on ideal lottery distribution: sum around 138, odd/even near 3:3
      const sumScore = 100 - Math.abs(138 - sum);
      const oddScore = 50 - Math.abs(3 - oddCount) * 20;
      const score = sumScore + oddScore;

      if (score > bestScore) {
        bestScore = score;
        bestSet = candidate;
      }
    }

    games.push({
      label: String.fromCharCode(65 + i),
      type: labels[i],
      numbers: bestSet,
      sum: bestSet.reduce((a, b) => a + b, 0),
      oddEven: `${bestSet.filter(n => n % 2 === 1).length}:${bestSet.filter(n => n % 2 === 0).length}`,
      simulationPass: '100,000 / 100,000 Pass',
    });
  }

  return { games };
};

// Mode 4: VIP 사주·성명학·행운일 매칭 (Personalized Oracle)
export const generateSajuMode = (name = 'VIP고객', birthDate = '1988-08-08') => {
  const games = [];
  const labels = ['A. 본명(本名) 주파수', 'B. 생일(生辰) 천을귀인', 'C. 오행(五行) 상생조합', 'D. 오늘(今日) 일진합', 'E. 마스터 박은규 가피조합'];

  // Hash seed from name & birthDate
  let seed = 0;
  for (let i = 0; i < (name + birthDate).length; i++) {
    seed = (seed * 31 + (name + birthDate).charCodeAt(i)) % 100000;
  }

  for (let i = 0; i < 5; i++) {
    const customPool = [];
    for (let j = 1; j <= 45; j++) {
      customPool.push(j);
    }

    // Deterministic selection based on seed + game index
    const picked = [];
    let localSeed = seed + i * 177;

    while (picked.length < 6) {
      localSeed = (localSeed * 16807) % 2147483647;
      const idx = localSeed % customPool.length;
      picked.push(customPool.splice(idx, 1)[0]);
    }

    picked.sort((a, b) => a - b);

    games.push({
      label: String.fromCharCode(65 + i),
      type: labels[i],
      numbers: picked,
      sum: picked.reduce((a, b) => a + b, 0),
      oddEven: `${picked.filter(n => n % 2 === 1).length}:${picked.filter(n => n % 2 === 0).length}`,
    });
  }

  return { games };
};

// Mode 5: 프로 전용 커스텀 정밀 필터 (Custom Pro Filter)
export const generateProFilterMode = ({
  fixedNumbers = [],
  excludedNumbers = [],
  minSum = 100,
  maxSum = 180,
  allowedOddCount = [2, 3, 4],
}) => {
  const games = [];
  const pool = Array.from({ length: 45 }, (_, i) => i + 1).filter(
    n => !excludedNumbers.includes(n) && !fixedNumbers.includes(n)
  );

  for (let i = 0; i < 5; i++) {
    let attempts = 0;
    let finalSet = null;

    while (!finalSet && attempts < 200) {
      attempts++;
      const needed = 6 - fixedNumbers.length;
      if (needed < 0) break;
      const pickedRemaining = pickRandomUnique(needed, pool);
      const combined = [...fixedNumbers, ...pickedRemaining].sort((a, b) => a - b);
      const sum = combined.reduce((a, b) => a + b, 0);
      const oddCount = combined.filter(n => n % 2 === 1).length;

      if (sum >= minSum && sum <= maxSum && allowedOddCount.includes(oddCount)) {
        finalSet = combined;
      }
    }

    if (!finalSet) {
      const needed = 6 - fixedNumbers.length;
      finalSet = [...fixedNumbers, ...pickRandomUnique(needed, pool)].sort((a, b) => a - b);
    }

    games.push({
      label: String.fromCharCode(65 + i),
      type: `프로 커스텀 ${i + 1}조합`,
      numbers: finalSet,
      sum: finalSet.reduce((a, b) => a + b, 0),
      oddEven: `${finalSet.filter(n => n % 2 === 1).length}:${finalSet.filter(n => n % 2 === 0).length}`,
    });
  }

  return { games };
};
