export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  type: 'free' | 'paid';
  fileUrl?: string;
  price?: number;
  notionFormUrl?: string;
  accountInfo?: {
    bank: string;
    number: string;
    holder: string;
  };
};

export const freeResources: Resource[] = [
  {
    id: "ai-prompt-guide",
    title: "언어재활사를 위한 AI 프롬프트 모음집",
    description:
      "보고서, 치료계획, 부모상담에 바로 쓸 수 있는 프롬프트 50개",
    category: "AI 활용",
    fileUrl: "/files/ai-prompt-guide.pdf",
    fileType: "PDF",
    type: "free",
  },
  {
    id: "kolra-reference",
    title: "KOLRA 검사 참고 자료",
    description:
      "한국어 읽기 검사(KOLRA) 해석 및 보고서 작성 참고 자료",
    category: "평가",
    fileUrl: "/files/kolra-reference.pdf",
    fileType: "PDF",
    type: "free",
  },
  {
    id: "daily-record-template",
    title: "임상 일지 템플릿",
    description:
      "매일 쓰기 좋은 간결한 임상 기록 양식 (Notion + PDF 버전)",
    category: "기록",
    fileUrl: "/files/daily-record.pdf",
    fileType: "PDF",
    type: "free",
  },
  {
    id: "study-planner",
    title: "국가고시 학습 플래너",
    description:
      "1급·2급 언어재활사 국가고시 준비를 위한 주간 학습 플래너",
    category: "학습",
    fileUrl: "/files/study-planner.pdf",
    fileType: "PDF",
    type: "free",
  },
  {
    id: "parent-consult-script",
    title: "보호자 상담 스크립트 예시",
    description:
      "초보 재활사를 위한 보호자 상담 대화 예시 모음",
    category: "임상",
    fileUrl: "/files/parent-consult.pdf",
    fileType: "PDF",
    type: "free",
  },
];

export const paidResources: Resource[] = [
  // 유료 자료를 추가할 때 여기에 작성하세요. 예시:
  // {
  //   id: "example-paid",
  //   title: "자료 제목",
  //   description: "자료 설명",
  //   category: "카테고리",
  //   fileType: "PDF",
  //   type: "paid",
  //   price: 15000,
  //   notionFormUrl: "https://YOUR_NOTION_FORM_URL",
  //   accountInfo: {
  //     bank: "카카오뱅크",
  //     number: "3333-00-0000000",
  //     holder: "이승윤",
  //   },
  // },
];

export const resources: Resource[] = [...freeResources, ...paidResources];
