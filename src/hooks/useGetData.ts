// Modules
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

// Endpoints
import { 
  EventType,
  getConferenciasApi,
  getCursosApi, 
  getPonenciasApi, 
  getTalleresApi 
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
  return useQuery('get-cursos', getPonenciasApi, {
    select: (data) => data.data
  });
}
