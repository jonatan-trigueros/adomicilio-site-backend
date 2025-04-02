/* eslint-disable prettier/prettier */
export class CreateUserDto {
    email: string;
    username: string;
    name?: string;
    password: string;
    profilePic?: string;
    bio?: string;
    favoriteFood?: string;
    badges?: string[];
    isActive?: boolean;
    role?: string;
}