import { User } from "./users.interface";

export interface CheckTokenResponse {
    user:  User;
    token: string;
}
