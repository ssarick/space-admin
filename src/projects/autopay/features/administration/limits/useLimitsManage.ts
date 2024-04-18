import useLimitsEdit from './useLimitsEdit';
import useLimitsFetch from './useLimitsFetch';

export default function useLimitsManage() {
  const {
    limitList,
    ...limitFetchResult
  } = useLimitsFetch();

  return {
    limitList,
    ...limitFetchResult,
    ...useLimitsEdit(limitList)
  };
}
