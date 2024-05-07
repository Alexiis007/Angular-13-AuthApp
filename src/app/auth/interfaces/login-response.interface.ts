import { User } from "./users.interface";

export interface LoginResponse {
    user:  User;
    token: string;
}
