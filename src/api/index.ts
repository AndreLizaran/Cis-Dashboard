import axiosInstance from '../utils/axios';

export type EventType = {
  id:number;
  name:string;
  image:string;
  eventName:string;
  day:string;
  hour:string;
}

export function getTalleresApi () {
  return axiosInstance.get<EventType[]>('/expositores');
}

export function getConferenciasApi () {
  return axiosInstance.get<EventType[]>('/expositores');
}

export function getCursosApi () {
  return axiosInstance.get<EventType[]>('/expositores');
}

export function getPonenciasApi () {
  return axiosInstance.get<EventType[]>('/expositores');
}