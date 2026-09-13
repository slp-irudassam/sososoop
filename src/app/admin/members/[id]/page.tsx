import { notFound } from 'next/navigation';
import { getAdminUser } from '@/lib/admin';
import { getMemberDetail } from '@/lib/admin-data';
import MemberDetailView from '../../_components/MemberDetailView';
import ServiceKeyMissing from '../../_components/ServiceKeyMissing';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AdminMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await getAdminUser())) notFound();

  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const detail = await getMemberDetail(id);
  if (detail === 'unavailable') return <ServiceKeyMissing />;
  if (!detail) notFound();

  return <MemberDetailView detail={detail} />;
}
