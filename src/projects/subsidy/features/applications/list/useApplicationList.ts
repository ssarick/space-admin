
import useApplicationDelete from './composables/useApplicationDelete';
import useApplicationsFetch from './composables/useApplicationsFetch';
import useFileUpload from './composables/useFileUpload';
import useMinfinSender from './composables/useMinfinSender';

export default function useApplications() {
  const fetchControls = useApplicationsFetch();

  const fileUploadControls = useFileUpload(
    fetchControls
  );

  const applicationDeleteControls = useApplicationDelete(
    fetchControls
  );

  const applicationMinfinControls = useMinfinSender(
    fetchControls
  );

  return {
    ...fetchControls,
    ...fileUploadControls,
    ...applicationDeleteControls,
    ...applicationMinfinControls
  };
}
