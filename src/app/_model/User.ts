import { Role } from "./roles";
export class User {
    access: string;
    refresh: string;
    email: string;
    role: Role;
    name : string;
    id: number;
  }