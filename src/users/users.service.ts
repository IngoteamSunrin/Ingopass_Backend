import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ id: id }).exec();
  }

  async create(data: object): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async update(id: string, key: any, value: any): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ id: id }, { $set: { key: value } })
      .exec();
  }
}
