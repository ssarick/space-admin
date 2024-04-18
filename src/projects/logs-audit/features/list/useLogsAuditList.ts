
import useLogsAuditDetails from './composables/useLogsAuditDetails';
import useLogsAuditFetch from './composables/useLogsAuditFetch';
import useLogsAuditUnloading from './composables/useLogsAuditUnloading';

export default function useLogsAuditList() {
  const fetchControls = useLogsAuditFetch();
  const detailControls = useLogsAuditDetails();
  const unloadingControls = useLogsAuditUnloading();

  return {
    ...fetchControls,
    ...detailControls,
    ...unloadingControls
  };
}
