// 결제 가능한 상품(유료 자료 + 강의)을 id로 해석하는 서버 전용 모듈.
// 금액의 신뢰 원천은 Notion(폴백=static 데이터)이며, 클라이언트가 보낸 금액은
// 결제 승인(confirm) 시 이 값과 대조해 위변조를 차단한다.

import { getResources, getLectures } from '@/lib/notion';
import { freeResources, paidResources, type Resource } from '@/data/resources';
import { lectures as staticLectures, type Lecture } from '@/data/lectures';

export type Purchasable = {
  id: string;
  title: string;
  orderName: string; // 토스 결제창/영수증 표기명
  amount: number; // KRW
  kind: 'resource' | 'lecture';
};

// 기존 토스 심사 URL(/checkout?product=cbt)을 계속 살려두기 위한 별칭.
const CBT_TITLE = '언어재활사 CBT 연습앱 이용권';

async function loadResources(): Promise<Resource[]> {
  return (await getResources()) ?? [...freeResources, ...paidResources];
}

async function loadLectures(): Promise<Lecture[]> {
  return (await getLectures()) ?? staticLectures;
}

// id로 결제 상품 하나를 해석한다. 유료 자료를 먼저, 없으면 강의에서 찾는다.
export async function getPurchasable(
  rawId: string | undefined | null,
): Promise<Purchasable | null> {
  if (!rawId) return null;

  const [resources, lects] = await Promise.all([loadResources(), loadLectures()]);
  const paid = resources.filter((r) => r.type === 'paid');

  let id = rawId;
  if (rawId === 'cbt') {
    const cbt = paid.find((r) => r.title === CBT_TITLE);
    if (cbt) id = cbt.id;
  }

  const res = paid.find((r) => r.id === id);
  if (res && typeof res.price === 'number' && res.price > 0) {
    return {
      id: res.id,
      title: res.title,
      orderName: res.title,
      amount: res.price,
      kind: 'resource',
    };
  }

  const lec = lects.find((l) => l.id === id);
  if (lec && typeof lec.price === 'number' && lec.price > 0) {
    return {
      id: lec.id,
      title: lec.title,
      orderName: lec.title,
      amount: lec.price,
      kind: 'lecture',
    };
  }

  return null;
}
