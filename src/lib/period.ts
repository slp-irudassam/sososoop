// 상품별 서비스 제공기간(토스 심사 기준: 결제일로부터 최대 기간을 상세·결제 화면에 명시).
// 기본 12개월, 'AI로 나만의 책 출판하기' 강의만 3개월.
export function servicePeriodMonths(title: string): number {
  return title.includes('책 출판') ? 3 : 12;
}

export function servicePeriodLabel(title: string): string {
  return `결제일로부터 ${servicePeriodMonths(title)}개월`;
}
