import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllBoards(user: User): Promise<Board[]>;
}
