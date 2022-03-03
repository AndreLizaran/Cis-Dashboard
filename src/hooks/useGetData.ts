// Modules
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

// Endpoints
import { 
  deleteConferencia,
  deleteCurso,
  deleteExpositor,
  deletePonencia,
  deleteTaller,
  editExpositorApi,
  EventType,
  Expositor,
  getConferenciasApi,
  getCursosApi, 
  getExpositoresApi, 
  getPonenciasApi, 
  getTalleresApi, 
  loginUserApi, 
  saveNewConferencia, 
  saveNewCurso, 
  saveNewExpositorApi,
  saveNewPonencia,
  saveNewTaller,
  validateTokenApi
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

  // Login
  function useLoginUser () {
    return useMutation(loginUserApi);
  }

  function useValidateToken () {
    return useMutation(validateTokenApi);

  }

  // Expositores
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


  // Eventos GET
  function useGetTalleres() {
    return useQuery('get-talleres', getTalleresApi, {
      select: (data) => {
        const dataTalleres = data.data;
        return getEventosAddingData(dataTalleres, 1);
      }
    });
  }
  
  function useGetConferencias() {
    return useQuery('get-conferencias', getConferenciasApi, {
      select: (data) => {
        const dataConferencias = data.data;
        return getEventosAddingData(dataConferencias, 2);         
      }
    });
  }
  
  function useGetCursos() {
    return useQuery('get-cursos', getCursosApi, {
      select: (data) => {
        const dataCursos = data.data;
        return getEventosAddingData(dataCursos, 3);         
      }
    });
  }
  
  function useGetPonencias() {
    return useQuery('get-ponencias', getPonenciasApi, {
      select: (data) => {
        const dataPonencias = data.data;
        return getEventosAddingData(dataPonencias, 4); 
      }
    });
  }

  // Eventos POST
  function useSaveNewTaller () {
    return useMutation(saveNewTaller);
  }

  function useSaveNewConferencia () {
    return useMutation(saveNewConferencia);
  }

  function useSaveNewCurso () {
    return useMutation(saveNewCurso);
  }

  function useSaveNewPonencia () {
    return useMutation(saveNewPonencia);
  }

  // Eventos PUT

  // Eventos DELETE
  function useDeleteTaller () {
    return useMutation(deleteTaller);
  }

  function useDeleteConferencia () {
    return useMutation(deleteConferencia);
  }

  function useDeleteCurso () {
    return useMutation(deleteCurso);
  }

  function useDeletePonencia () {
    return useMutation(deletePonencia);
  }

  // Helpers
  function getExpositoresData () {
    return queryClient.getQueryData('get-expositores') as AxiosResponse<Expositor[], any>
  }

  function getEventosAddingData (data: EventType[], eventType:number) {
    const { data:dataExpositores } = getExpositoresData();
    data = data.map((evento) => {
      evento = {
        ...evento,
        expositor: {
          name:'',
          image:''
        },
        eventType
      }
      let expositorInformation = dataExpositores?.filter((expositor) => expositor.id === evento.idExpositor) || [];
      if (expositorInformation.length > 0) {
        evento.expositor.name = expositorInformation[0].name; 
        evento.expositor.image = expositorInformation[0].image; 
      }
      return evento;
    })
    return data;
  }

  return {
    useEditExpositor,
    useSaveNewExpositor,
    useGetExpositores,
    useDeleteExpositor,
    useSaveNewTaller,
    useSaveNewConferencia,
    useSaveNewCurso,
    useSaveNewPonencia,
    useLoginUser,
    useValidateToken,
    useDeleteTaller,
    useDeleteConferencia,
    useDeleteCurso,
    useDeletePonencia,
    useGetTalleres,
    useGetConferencias,
    useGetCursos,
    useGetPonencias,
  }

}