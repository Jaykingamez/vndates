import { Profile } from "./profile";

export class Account {
    // unique identifier
    public _id: string;
    public username: string;
    public password: string;
    public email: string;
    public profilePhoto: string;
    // real profile of user
    public realProfile: Profile;
    // fake profile of user
    public fakeProfile: Profile;

    constructor(username: string, password: string, email: string, profilePhoto: string){
        this.username = username;
        this.password = password;
        this.email = email;
        this.profilePhoto = profilePhoto;
    }
}