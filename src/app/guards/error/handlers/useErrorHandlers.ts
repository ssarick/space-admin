import useForbidden from './useForbidden';
import useInternalError from './useInternaError';
import useNotFound from './useNotFound';

export default function useErrorHandlers() {
  return [
    useNotFound(),
    useInternalError(),
    useForbidden()
  ];
}
