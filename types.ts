export interface Restaurant {
  name: string;
  district: string;
  cuisineType: string;
  priceRange: string; // e.g., "$", "$$"
  rating: number; // 1.0 to 5.0
  description: string;
  address: string;
  highlightDish: string;
}

export enum District {
  ALL = "全高雄",
  ZUO_YING = "左營區",
  GU_SHAN = "鼓山區",
  SAN_MIN = "三民區",
  LING_YA = "苓雅區",
  XIN_XING = "新興區",
  QIAN_JIN = "前金區",
  YAN_CHENG = "鹽埕區",
  FENG_SHAN = "鳳山區",
  QIAN_ZHEN = "前鎮區",
}

export const DISTRICTS = Object.values(District);

export enum PriceLevel {
  ALL = "不限",
  CHEAP = "$",
  MODERATE = "$$",
  EXPENSIVE = "$$$",
}

export const PRICE_OPTIONS = [
  { label: "ANY", value: PriceLevel.ALL, desc: "隨機" },
  { label: "$", value: PriceLevel.CHEAP, desc: "平價" },
  { label: "$$", value: PriceLevel.MODERATE, desc: "中價" },
  { label: "$$$", value: PriceLevel.EXPENSIVE, desc: "高級" },
];