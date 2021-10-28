export class Conversation{
    // unique identifier of user 
    private uid: string;
    // user's username
    private username: string;

    constructor(uid: string, username: string){
        this.uid = uid; 
        this.username = username;
    }

    public getUid(): string{
        return this.uid;
    }

    public getUsername(): string{
        return this.username;
    }
}