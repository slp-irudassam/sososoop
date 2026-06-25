import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints/common';
import type { Resource } from '@/data/resources';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function text(props: Record<string, unknown>, key: string): string {
  const p = props[key] as { type?: string; rich_text?: { plain_text: string }[]; title?: { plain_text: string }[] } | undefined;
  if (!p) return '';
  if (p.type === 'title') return (p.title ?? []).map((t) => t.plain_text).join('');
  if (p.type === 'rich_text') return (p.rich_text ?? []).map((t) => t.plain_text).join('');
  return '';
}

function url(props: Record<string, unknown>, key: string): string | undefined {
  const p = props[key] as { type?: string; url?: string | null } | undefined;
  return p?.type === 'url' ? (p.url ?? undefined) : undefined;
}

function num(props: Record<string, unknown>, key: string): number | undefined {
  const p = props[key] as { type?: string; number?: number | null } | undefined;
  return p?.type === 'number' ? (p.number ?? undefined) : undefined;
}

function select(props: Record<string, unknown>, key: string): string | null {
  const p = props[key] as { type?: string; select?: { name: string } | null } | undefined;
  return p?.type === 'select' ? (p.select?.name ?? null) : null;
}

export async function getResources(): Promise<Resource[] | null> {
  const dsId = process.env.NOTION_RESOURCES_DS_ID;
  if (!dsId || !process.env.NOTION_TOKEN) return null;

  try {
    const response = await notion.dataSources.query({
      data_source_id: dsId,
      sorts: [{ property: '정렬순서', direction: 'ascending' }],
    });

    return response.results
      .filter((item): item is PageObjectResponse => item.object === 'page' && 'properties' in item)
      .map((page) => {
        const props = page.properties as Record<string, unknown>;

        const typeVal = select(props, '구분');
        const bank = text(props, '계좌은행');
        const number = text(props, '계좌번호');
        const holder = text(props, '예금주');

        const resource: Resource = {
          id: page.id,
          title: text(props, '제목'),
          description: text(props, '설명'),
          category: select(props, '카테고리') ?? '',
          fileType: text(props, '파일형식'),
          type: typeVal === '유료' ? 'paid' : 'free',
          fileUrl: url(props, '파일URL'),
          downloadName: text(props, '다운로드파일명') || undefined,
          linkUrl: url(props, '링크URL'),
          price: num(props, '가격'),
          notionFormUrl: url(props, '신청폼URL'),
          accountInfo: bank && number && holder ? { bank, number, holder } : undefined,
        };

        return resource;
      });
  } catch {
    return null;
  }
}
