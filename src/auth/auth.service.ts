import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './auth.entity';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(providerId: number, user: User): Promise<void> {
    const existUser = await this.userRepository.find();
    if (existUser) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
          providerId: user.providerId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          grade: user.grade,
          class: user.class,
          num: user.num,
          caution: user.caution,
        })
        .where('id = :id', { providerId })
        .execute();
    }
  }

  async createToken(payload: JwtPayload, refresh: boolean) {
    if (refresh) {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: process.env.JWT_SERECT,
        expiresIn: '1y',
      });
      return token;
    } else {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: process.env.JWT_SERECT,
        expiresIn: '1w',
      });
      return token;
    }
  }
  async login(req) {
    if (!req.user) {
      return 'No user!';
    }

    return req.user;
  }
}
