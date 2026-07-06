export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  type: 'free' | 'paid';
  fileUrl?: string;
  downloadName?: string;
  linkUrl?: string;
  price?: number;
  image?: string;
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
    fileUrl: "/files/언어치료·특수교육 AI 활용 프롬프트 50_무료공유_이루다쌤.pdf",
    downloadName: "언어치료·특수교육 AI 활용 프롬프트 50_무료공유_이루다쌤.pdf",
    fileType: "PDF",
    type: "free",
    image: "/images/resource-ai-prompt-guide.png",
  },
  {
    id: "reading-ssokssok-gpt",
    title: "소소숲 vol2. 이루다쌤의 읽기학습지 생성봇 읽기쏙쏙",
    description:
      "학년과 주제 키워드만 입력하면, 해당 수준에 맞는 읽기 지문과 문제, 어휘 정리, 그리고 어울리는 이미지를 생성할 수 있는 프롬프트까지 자동으로 생성해주는 선생님을 위한 학습 자료 제작 GPT입니다.",
    category: "AI 활용",
    linkUrl:
      "https://chatgpt.com/g/g-69573a7815a48191adc238d9d52711d0-sososup-vol2-irudassaemyi-ilggihagseubji-saengseongbos-ilggissogssog",
    fileType: "GPT",
    type: "free",
    image: "/images/resource-reading-gpt.png",
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
    image: "/images/resource-daily-record.png",
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
    image: "/images/resource-study-planner.png",
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
    image: "/images/resource-parent-consult.png",
  },
];

export const paidResources: Resource[] = [
  {
    id: "ai-prompt-100-pack",
    title: "AI 활용 프롬프트 100 + 자료 패키지",
    description:
      "3종 묶음: ① 언어치료·특수교육 AI 활용 프롬프트 100선 ② 치료 자료 소스 사이트 모음 ③ 캔바 요소 키워드 모음. 무료판(프롬프트 50)의 확장 버전과 실전 자료 제작 리소스를 한 번에.",
    category: "콘텐츠 제작",
    fileType: "PDF 3종",
    type: "paid",
    price: 9900,
    image: "/images/resource-ai-prompt-100.png",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
  {
    id: "pfa-report-gpt",
    title: "P-FA 평가보고서 초안 생성기",
    description:
      "파라다이스-유창성검사II(P-FAII) 평가보고서 초안 작성을 돕는 전문 보조 도구입니다. 평가 결과 엑셀파일과 발화 전사문, 아동 배경정보 파일을 첨부하고 '첨부 내용으로 평가보고서 작성해줘'라고 하시면 보고서 초안을 만들어 줍니다.",
    category: "AI 활용",
    fileType: "GPT",
    type: "paid",
    price: 5000,
    image: "/images/resource-pfa-gpt.png",
    notionFormUrl: "https://sunrise-wisteria-5ca.notion.site/ca565ef8fa6b4b81b3f6be3978a2e84a",
    accountInfo: {
      bank: "토스뱅크",
      number: "1000-1285-0842",
      holder: "이승윤",
    },
  },
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
