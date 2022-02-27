import axiosInstance from '../utils/axios';

export type EventType = {
  id:number;
  idExpositor:number;
  expositor: {
    name:string,
    image:string,
  }
  title:string;
  bgImage:string;
  description:string;
  day:string;
  hour:string;
  eventType:number;
}

export type CleanEventType = {
  id:number;
  idExpositor:number;
  title:string;
  bgImage:string;
  description:string;
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

export type Login = {
  email:string;
  password:string;
}

// Login
export function loginUser (data:Login) {
  return axiosInstance.post('/login', data);
}

// Expositores
export function getExpositoresApi () {
  return axiosInstance.get<Expositor[]>('/expositores');
}

export function saveNewExpositorApi (data:Expositor ) {
  return axiosInstance.post('/expositores', data);
}

export function editExpositorApi (data:Expositor) {
  return axiosInstance.put(`/expositores/${data.id}`, data);
}

export function deleteExpositor (id:string | number) {
  return axiosInstance.delete(`/expositores/${id}`);
}

// Eventos get
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

// Eventos post
export function saveNewTaller (data:CleanEventType) {
  return axiosInstance.post(`/talleres`, data);
}

export function saveNewConferencia (data:CleanEventType) {
  return axiosInstance.post(`/conferencias`, data);
}

export function saveNewPonencia (data:CleanEventType) {
  return axiosInstance.post(`/ponencias`, data);
}

export function saveNewCurso (data:CleanEventType) {
  return axiosInstance.post(`/cursos`, data);
}