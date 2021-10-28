import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Conversation } from './conversation';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {


  constructor(private realTime: AngularFireDatabase) { }

  // get all conversations involving a certain user
  getConversations(username: string) {
    return this.realTime.list<Conversation>("Conversation/" + username).valueChanges();
  }

  // add another conversation with another user
  addConversation(username: string, conversation: Conversation) {
    return this.realTime.list<Conversation>("Conversation/" + username).set(conversation.getUsername(), conversation);
  }

  // get all messages from a conversation
  getMessages(conversationName: string) {
    return this.realTime.list<Message>("Message/" + conversationName).valueChanges();
  }


  // add a message to a conversation
  addMessage(conversationName: string, message: Message) {
    return this.realTime.list<Message>("Message/" + conversationName).push(message);
  }

}
