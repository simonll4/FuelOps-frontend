// Servicio para interactuar con el endpoint de alarmas
import api from '@/services/api.service';
import type { Alarm, AlarmResponse } from '@/interfaces/alarm.interface';

export const getAlarms = async (
  idOrder: number,
  page: number = 0,
  size: number = 5,
  sort: string = 'timeStamp'
): Promise<AlarmResponse> => {
  if (!idOrder) throw new Error('idOrder is required');

  const { data } = await api().get(`/alarms`, {
    params: {
      idOrder,
      page,
      size,
      sort
    }
  });

  return {
    alarms: data.alarms,
    pagination: {
      totalElements: data.pagination.totalElements,
      currentPage: data.pagination.pageable.pageNumber,
      totalPages: data.pagination.totalPages
    }
  };
};