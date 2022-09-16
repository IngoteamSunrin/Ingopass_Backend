import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDto> {
    try {
      return this.userModel.findOne({ id: id }).exec();
    } catch (err) {
      throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, key: any, value: any): Promise<UserDto> {
    return this.userModel
      .findOneAndUpdate({ id: id }, { $set: { key: value } })
      .exec();
  }
}
