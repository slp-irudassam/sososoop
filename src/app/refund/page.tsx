import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: '환불정책',
  description: '소소숲:지혜의 기록소 강의 및 자료 환불정책',
};

const sections: LegalSection[] = [
  {
    heading: '1. 기본 원칙',
    blocks: [
      {
        type: 'p',
        text: '소소숲의 환불정책은 「전자상거래 등에서의 소비자보호에 관한 법률」을 따릅니다. 강의와 자료는 디지털 콘텐츠의 특성이 있어, 콘텐츠 제공·열람 여부에 따라 환불 기준이 달라집니다.',
      },
    ],
  },
  {
    heading: '2. 유료 자료(디지털 콘텐츠) 환불',
    blocks: [
      {
        type: 'list',
        items: [
          '결제 후 파일을 다운로드하지 않았고 GPT·콘텐츠 링크에 접근하지 않은 경우: 7일 이내 전액 환불',
          '파일을 다운로드했거나 GPT·콘텐츠 링크에 접근한 경우: 디지털 콘텐츠의 특성상 청약철회가 제한됩니다 (전자상거래법 제17조 제2항).',
          '무료로 제공되는 자료는 환불 대상이 아닙니다.',
        ],
      },
    ],
  },
  {
    heading: '3. 강의 환불',
    blocks: [
      {
        type: 'list',
        items: [
          '수강 시작 전(첫 라이브 강의 참여 또는 녹화본·강의자료 열람 전): 전액 환불',
          '강의 자료·녹화본을 이미 제공받은 경우: 콘텐츠의 특성상 환불이 제한될 수 있습니다.',
          '라이브 강의는 강의 시작일을 기준으로 위 규정을 적용합니다.',
        ],
      },
      {
        type: 'p',
        text: '단순 변심에 의한 환불은 콘텐츠 제공·열람 전에 한하여 가능하며, 이미 제공받은 자료가 있는 경우 제공된 부분에 상응하는 금액을 공제할 수 있습니다.',
      },
    ],
  },
  {
    heading: '4. 환불 신청 방법',
    blocks: [
      {
        type: 'list',
        items: [
          '카카오채널 @소소숲로 환불을 신청합니다.',
          '환불 사유와 입금 시 사용한 계좌 정보를 함께 알려주시면 확인 후 처리합니다.',
          '환불금은 확인 완료 후 영업일 기준 3~5일 이내에 입금하신 계좌로 환급합니다.',
        ],
      },
    ],
  },
  {
    heading: '5. 문의',
    blocks: [
      {
        type: 'p',
        text: '환불 및 결제에 관한 문의는 카카오채널 @소소숲로 연락 주시기 바랍니다.',
      },
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      title="환불정책"
      effectiveDate="2026년 7월 8일"
      intro="소소숲:지혜의 기록소(이하 '소소숲')는 이용자의 권익 보호를 위해 아래와 같이 환불정책을 운영합니다."
      sections={sections}
    />
  );
}
