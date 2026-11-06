export type UserRole = 'user' | 'admin' | 'lab_staff' | 'phlebotomist';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface UserBooking {
  _id: string;
  user: { _id: string; name: string; email: string };
  test: {
    _id: string;
    name: string;
    category?: string;
    price: number;
    description?: string;
  };
  patientName: string;
  patientAge?: number;
  patientGender?: 'male' | 'female' | 'other';
  patientPhone?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landmark?: string;
  } | string;
  appointmentDate: string;
  timeSlot: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'sample_collected' | 'completed' | 'cancelled';
  notes?: string;
  reportUrl?: string;
  createdAt: string;
  updatedAt: string;
}
