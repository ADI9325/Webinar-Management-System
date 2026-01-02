// frontend/src/services/api.ts

import axios from 'axios';
import { Webinar, Attendee, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const webinarApi = {
  getAllWebinars: async (): Promise<Webinar[]> => {
    const response = await api.get<ApiResponse<Webinar[]>>('/webinars');
    return response.data.data;
  },

  getWebinarById: async (id: string): Promise<Webinar> => {
    const response = await api.get<ApiResponse<Webinar>>(`/webinars/${id}`);
    return response.data.data;
  },

  createWebinar: async (data: {
    title: string;
    description: string;
    scheduledAt: string;
  }): Promise<Webinar> => {
    const response = await api.post<ApiResponse<Webinar>>('/webinars', data);
    return response.data.data;
  },

  registerAttendee: async (
    webinarId: string,
    data: { fullName: string; email: string }
  ): Promise<Attendee> => {
    const response = await api.post<ApiResponse<Attendee>>(
      `/webinars/${webinarId}/register`,
      data
    );
    return response.data.data;
  },

  getAttendees: async (webinarId: string): Promise<Attendee[]> => {
    const response = await api.get<ApiResponse<Attendee[]>>(
      `/webinars/${webinarId}/attendees`
    );
    return response.data.data;
  },
};
