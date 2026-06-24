export type Lecture = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  notionFormUrl: string;
  accountInfo: {
    bank: string;
    number: string;
    holder: string;
  };
};

export const lectures: Lecture[] = [
  {
    id: "book-publishing",
    title: "AI로 나만의 책 출판하기",
    description:
      "AI를 활용해 전자책과 종이책을 직접 출판하는 전 과정을 담았습니다. 기획부터 원고 작성, 디자인, 유통까지 한 번에.",
    price: 200000,
    duration: "5시간",
    category: "출판",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
  {
    id: "ai-basics",
    title: "언어재활사를 위한 AI 활용 기초",
    description:
      "ChatGPT, Claude 등 AI 도구를 임상 현장에 바로 쓸 수 있도록 안내합니다. 보고서 초안 작성, 치료 계획 아이디어, 부모 상담 자료까지 한 번에.",
    price: 49000,
    duration: "3시간",
    category: "AI 활용",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
  {
    id: "report-writing",
    title: "평가보고서 작성 효율화 with AI",
    description:
      "AI로 평가보고서 초안을 빠르게 잡고, 전문성 있게 다듬는 실전 강의. KOLRA, P-FA 등 주요 검사 보고서 예시 포함.",
    price: 39000,
    duration: "2시간",
    category: "보고서 작성",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
  {
    id: "content-creation",
    title: "교육 콘텐츠 제작 마스터클래스",
    description:
      "카드뉴스, PPT, 유튜브 자료까지 — 나만의 콘텐츠를 빠르게 만드는 실전 워크샵. Canva + AI 도구 조합.",
    price: 59000,
    duration: "4시간",
    category: "콘텐츠 제작",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
];
