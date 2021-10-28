// Match class that stores Match information
export class Match{
    // unique identifier of match
    public _id: string;
    // account id of a user
    public accountId: string;
    // another account id of another user
    public secondAccountId: string;
    // match status of first user
    public firstIdStatus: string;
    // match status of second user
    public secondIdStatus: string;

    constructor(accountId){
        this.accountId = accountId;
    }
}