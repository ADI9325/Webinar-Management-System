// frontend/src/types/index.ts

export interface Webinar {
  _id: string;
  title: string;
  description: string;
  scheduledAt: string;
  attendeeCount: number;
  createdAt: string;
  attendees?: Attendee[];
}

export interface Attendee {
  _id: string;
  webinarId: string;
  fullName: string;
  email: string;
  joinedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
}
