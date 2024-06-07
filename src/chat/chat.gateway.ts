import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8834, { cors: '*', transports: ['websocket', 'polling'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    // console.log(createChatDto);
    // return this.chatService.create(createChatDto);
    // this.server.emit('res_message', createChatDto);
    console.log(createChatDto);

    this.server.to('thisisId').emit('res_message', createChatDto);
  }

  // @SubscribeMessage('typing')
  // typing(
  //   @MessageBody() typingChat: CreateChatDto,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   // return this.chatService.create(createChatDto);
  //   console.log(socket.handshake.query);
  //   socket.broadcast.emit('typing', typingChat);
  // }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }
  // @SubscribeMessage('connection')
  // join(@ConnectedSocket() socket: Socket) {
  //   return socket.broadcast.emit('connection', 'someone connected to the chat');
  // }
  @SubscribeMessage('joinRoom')
  join(@MessageBody() id: string, @ConnectedSocket() socket: Socket) {
    console.log(socket.id);
    socket.join(id);
    socket.emit(
      'joinedRoom',
      `you join the room ${id} and your id is ${socket.id}`,
    );
  }
}
