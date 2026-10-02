// Lotto 6/45 Data, Ball Stylings, Historical Draw Samples & Master Quotes

export const getBallStyle = (num) => {
  if (num <= 10) {
    return {
      bg: 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700',
      border: 'border-amber-200/60',
      text: 'text-amber-950 font-black',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
      label: '황금',
    };
  } else if (num <= 20) {
    return {
      bg: 'bg-gradient-to-br from-sky-400 via-blue-600 to-blue-900',
      border: 'border-sky-200/60',
      text: 'text-white font-black',
      glow: 'shadow-[0_0_15px_rgba(37,99,235,0.5)]',
      label: '청옥',
    };
  } else if (num <= 30) {
    return {
      bg: 'bg-gradient-to-br from-rose-400 via-red-600 to-red-950',
      border: 'border-rose-200/60',
      text: 'text-white font-black',
      glow: 'shadow-[0_0_15px_rgba(225,29,72,0.5)]',
      label: '홍옥',
    };
  } else if (num <= 40) {
    return {
      bg: 'bg-gradient-to-br from-slate-400 via-slate-600 to-slate-900',
      border: 'border-slate-300/60',
      text: 'text-white font-black',
      glow: 'shadow-[0_0_15px_rgba(100,116,139,0.5)]',
      label: '흑요석',
    };
  } else {
    return {
      bg: 'bg-gradient-to-br from-emerald-400 via-emerald-600 to-emerald-950',
      border: 'border-emerald-200/60',
      text: 'text-white font-black',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]',
      label: '비취',
    };
  }
};

// C안: 위트와 영험함이 넘치는 도사님의 호탕함 + 퀀트 마스터의 근엄한 명언 하이브리드
export const MASTER_QUOTES = [
  {
    type: 'spiritual',
    quote: "허허! 내 머리 위의 핑크 리본이 우주의 1등 주파수와 공명하고 있구나!",
    sub: "이 조합에는 강력한 역전의 기운이 깃들어 있다.",
  },
  {
    type: 'quant',
    quote: "100,000회의 몬테카를로 난수 분산을 돌파하여 추출한 절대적 기운의 6개 숫자다.",
    sub: "수학적 확률과 마스터의 직관이 완벽한 균형을 이루었다.",
  },
  {
    type: 'spiritual',
    quote: "의심하지 마라. 그대의 이마에 이미 황금빛 인생역전의 서기가 가득하구나!",
    sub: "가장 순수한 마음으로 이 번호들을 품어라.",
  },
  {
    type: 'quant',
    quote: "과거 1,100여 회의 빅데이터 가중치를 분석하여 극대화된 엔트로피를 도출했다.",
    sub: "100만원의 가치를 증명하는 정밀 퀀트 분석 완료.",
  },
  {
    type: 'spiritual',
    quote: "핑크빛 리본의 기운을 담았으니, 이번 주 토요일 저녁 8시 45분은 그대의 축제가 되리라!",
    sub: "마스터 박은규가 보증하는 금주의 최고 명운 번호.",
  },
  {
    type: 'quant',
    quote: "홀짝 3:3 균형과 총합 120~160의 이상적 골디락스 구간에 정확히 안착했느니라.",
    sub: "오류 없는 통계적 필터링을 완벽하게 통과한 조합.",
  },
  {
    type: 'spiritual',
    quote: "하늘이 인생역전의 기회를 줄 때는 주저 없이 잡아야 하는 법이다!",
    sub: "지금 그대의 손끝에 당첨의 에너지가 집중되고 있다.",
  },
  {
    type: 'hybrid',
    quote: "우주의 섭리와 박은규의 안목이 만났으니, 이번 판은 실로 기대해도 좋겠구나!",
    sub: "인생역전의 신탁이 그대에게 내려졌다.",
  },
];

// Historical draw database sample (for backtesting demonstration)
export const HISTORICAL_DRAWS = [
  { round: 1145, numbers: [2, 11, 31, 33, 37, 44], bonus: 32, date: '2024-11-09' },
  { round: 1144, numbers: [3, 4, 12, 15, 26, 34], bonus: 6, date: '2024-11-02' },
  { round: 1143, numbers: [10, 16, 17, 27, 29, 36], bonus: 6, date: '2024-10-26' },
  { round: 1142, numbers: [2, 8, 28, 30, 37, 41], bonus: 22, date: '2024-10-19' },
  { round: 1141, numbers: [7, 11, 12, 21, 26, 35], bonus: 20, date: '2024-10-12' },
  { round: 1140, numbers: [7, 10, 22, 29, 31, 38], bonus: 15, date: '2024-10-05' },
  { round: 1139, numbers: [5, 12, 15, 30, 37, 40], bonus: 18, date: '2024-09-28' },
  { round: 1138, numbers: [14, 16, 19, 20, 29, 34], bonus: 40, date: '2024-09-21' },
  { round: 1137, numbers: [4, 9, 12, 15, 33, 45], bonus: 26, date: '2024-09-14' },
  { round: 1136, numbers: [21, 24, 27, 29, 32, 34], bonus: 35, date: '2024-09-07' },
  { round: 1135, numbers: [1, 6, 13, 19, 21, 33], bonus: 4, date: '2024-08-31' },
  { round: 1134, numbers: [3, 7, 9, 13, 19, 24], bonus: 23, date: '2024-08-24' },
  { round: 1133, numbers: [13, 14, 20, 28, 29, 34], bonus: 23, date: '2024-08-17' },
  { round: 1132, numbers: [6, 7, 19, 28, 34, 41], bonus: 20, date: '2024-08-10' },
  { round: 1131, numbers: [1, 2, 6, 14, 27, 38], bonus: 33, date: '2024-08-03' },
  { round: 1130, numbers: [15, 19, 21, 25, 27, 28], bonus: 40, date: '2024-07-27' },
  { round: 1129, numbers: [5, 10, 11, 17, 28, 34], bonus: 22, date: '2024-07-20' },
  { round: 1128, numbers: [1, 5, 8, 16, 28, 33], bonus: 45, date: '2024-07-13' },
  { round: 1127, numbers: [10, 15, 24, 30, 31, 37], bonus: 6, date: '2024-07-06' },
  { round: 1126, numbers: [4, 5, 9, 11, 37, 40], bonus: 7, date: '2024-06-29' },
  { round: 1125, numbers: [6, 14, 25, 33, 40, 44], bonus: 30, date: '2024-06-22' },
  { round: 1124, numbers: [15, 19, 21, 32, 40, 45], bonus: 25, date: '2024-06-15' },
  { round: 1123, numbers: [13, 19, 21, 24, 34, 35], bonus: 26, date: '2024-06-08' },
  { round: 1122, numbers: [3, 6, 21, 30, 34, 35], bonus: 22, date: '2024-06-01' },
  { round: 1121, numbers: [6, 24, 31, 32, 38, 44], bonus: 8, date: '2024-05-25' },
  { round: 1120, numbers: [2, 19, 26, 31, 38, 41], bonus: 34, date: '2024-05-18' },
  { round: 1119, numbers: [1, 9, 12, 13, 20, 45], bonus: 3, date: '2024-05-11' },
  { round: 1118, numbers: [11, 13, 14, 15, 16, 45], bonus: 3, date: '2024-05-04' },
  { round: 1117, numbers: [3, 4, 9, 30, 33, 45], bonus: 13, date: '2024-04-27' },
  { round: 1116, numbers: [1, 3, 4, 29, 42, 45], bonus: 36, date: '2024-04-20' },
  { round: 1115, numbers: [7, 12, 23, 32, 34, 36], bonus: 8, date: '2024-04-13' },
  { round: 1114, numbers: [16, 20, 26, 36, 42, 44], bonus: 24, date: '2024-04-06' },
  { round: 1113, numbers: [11, 13, 20, 21, 32, 44], bonus: 8, date: '2024-03-30' },
  { round: 1112, numbers: [16, 20, 26, 36, 42, 44], bonus: 23, date: '2024-03-23' },
  { round: 1111, numbers: [3, 13, 30, 33, 43, 45], bonus: 4, date: '2024-03-16' },
  { round: 1110, numbers: [3, 7, 11, 20, 22, 41], bonus: 24, date: '2024-03-09' },
  { round: 1109, numbers: [10, 12, 13, 19, 33, 40], bonus: 2, date: '2024-03-02' },
  { round: 1108, numbers: [7, 19, 26, 37, 39, 44], bonus: 27, date: '2024-02-24' },
  { round: 1107, numbers: [6, 14, 30, 31, 40, 41], bonus: 29, date: '2024-02-17' },
  { round: 1106, numbers: [1, 3, 4, 29, 42, 45], bonus: 36, date: '2024-02-10' },
];

// Top statistical weights (most frequent in Korea Lotto history)
export const TOP_FREQUENT_NUMBERS = [34, 43, 27, 17, 12, 18, 1, 13, 33, 4, 20, 14, 24];

// Cold numbers (underrepresented / drought numbers)
export const COLD_NUMBERS = [9, 22, 41, 5, 29, 39, 8, 32];
