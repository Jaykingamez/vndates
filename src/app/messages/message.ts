// Class that handles messages in a Conversation class
export class Message{
    // content of message
    messageText: string;
    // timestamp when message is sent
    messageTime: string;
    // username of user who sent the message
    messageUser: string;
    // id of user who sent the message
    uid: string;

    constructor(messageText: string, messageTime: string, messageUser: string, uid: string){
        this.messageText = messageText;
        this.messageTime = messageTime;
        this.messageUser = messageUser;
        this.uid = uid;
    }
}