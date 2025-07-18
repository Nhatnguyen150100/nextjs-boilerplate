export enum ERole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type TStatusUser = 'ACTIVE' | 'INACTIVE';

export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  nickName: string | null;
  description: string | null;
  backgroundUrl: string | null;
  tags: string[] | null;
  socialLinks: string[] | null;
  work: string | null;
  reward: string | null;
  position: string | null;
  hobby: string | null;
  experiences: string[] | null;
  educations: string[] | null;
  certifications: string[] | null;
  skills: string[] | null;
  interests: string[] | null;
  services: string[] | null;
  websites: string | null;
  numberOfFollowers: number;
  numberOfFollowing: number;
  avatar: string | null;
  address: string | null;
  phoneNumber: string;
  role: ERole;
  status?: TStatusUser;
  coin?: number;
}
