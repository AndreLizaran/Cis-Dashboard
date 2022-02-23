// Modules
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Endpoints
import { 
  deleteExpositor,
  editExpositorApi,
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

export function useGetData () {

  const queryClient = useQueryClient();

  function useEditExpositor () {
    return useMutation(editExpositorApi, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-expositores');
      }
    });
  }

  function useSaveNewExpositor () {
    return useMutation(saveNewExpositorApi, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-expositores');
      }
    });
  }

  function useGetExpositores() {
    return useQuery('get-expositores', getExpositoresApi, {
      select: (data) => data.data || []
    });
  }

  function useDeleteExpositor() {
    return useMutation(deleteExpositor, {
      onSuccess: () => {
        queryClient.invalidateQueries('get-expositores');
      }
    });
  }

  return {
    useEditExpositor,
    useSaveNewExpositor,
    useGetExpositores,
    useDeleteExpositor
  }

}