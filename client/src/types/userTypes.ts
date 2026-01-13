export interface UserData {
  _id: string;
  email: string;
  username: string;
  password?: string;
  name: string;
  phone?: string;
  role: 'user';
  isBlocked: boolean;
  profilePicture?: string;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
