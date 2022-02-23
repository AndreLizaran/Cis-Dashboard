// Modules
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Endpoints
import { 
  getConferenciasApi,
  getCursosApi, 
  getExpositoresApi, 
  getPonenciasApi, 
  getTalleresApi, 
  saveNewExpositorApi
} from '../api';

export function useGetTalleres() {
  return useQuery('get-talleres', getTalleresApi, {
    select: (data) => data.data
  });
}

export function useGetConferencias() {
  return useQuery('get-conferencias', getConferenciasApi, {
    select: (data) => data.data
  });
}

export function useGetCursos() {
  return useQuery('get-cursos', getCursosApi, {
    select: (data) => data.data
  });
}

export function useGetPonencias() {
  return useQuery('get-ponencias', getPonenciasApi, {
    select: (data) => data.data
  });
}

export function useGetExpositores() {
  return useQuery('get-expositores', getExpositoresApi, {
    select: (data) => data.data || []
  });
}

export function useSaveNewExpositor () {
  const queryClient = useQueryClient();
  return useMutation(saveNewExpositorApi, {
    onMutate: () => {
      queryClient.invalidateQueries('get-expositores');
    }
  });
}