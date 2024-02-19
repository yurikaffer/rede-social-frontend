export interface UserInterface {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  filePath: string;
  userName: string;
  biography: string;
}

export interface createUserInterface {
  name: string;
  email: string;
  userName: string;
  password: string;
}

export interface UpdateUserInterface {
  name: string;
  email: string;
  password: string;
  userName: string;
  biography: string;
}