import axiosInstance from '../utils/axios';

export type EventType = {
  id:number;
  name:string;
  image:string;
  eventName:string;
  day:string;
  hour:string;
}

export type Expositor = {
  id:number;
  name:string;
  description:string;
  image:string;
  bgImage:string;
}

export function getTalleresApi () {
  return axiosInstance.get<EventType[]>('/talleres');
}

export function getConferenciasApi () {
  return axiosInstance.get<EventType[]>('/conferencias');
}

export function getCursosApi () {
  return axiosInstance.get<EventType[]>('/cursos');
}

export function getPonenciasApi () {
  return axiosInstance.get<EventType[]>('/ponencias');
}

export function getExpositoresApi () {
  return axiosInstance.get<Expositor[]>('/expositores');
}