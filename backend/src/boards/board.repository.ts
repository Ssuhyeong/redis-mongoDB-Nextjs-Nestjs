import { Board } from './board.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(
        CreateBoardDto: CreateBoardDto,
        user: User
    ): Promise<Board> {
        const { title, description } = CreateBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user,
        });

        await this.save(board);
        return board;
    }
}
