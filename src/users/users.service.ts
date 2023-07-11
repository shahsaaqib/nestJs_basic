import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    const updatedData = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedData;
  }

  async remove(id: number): Promise<number> {
    const deletedRows = await this.userModel.destroy({
      where: { id },
    });
    return deletedRows;
  }
}
