import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';
import {
  UserCredentialDocument,
  User_credential,
} from './entities/user_credential.entity';
import { encodePassWord } from 'src/utils/encoder';

export type User = {
  id: number;
  username: string;
  name: string;
  password: string;
};

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectModel(User_credential.name)
    private userCredentialModel: Model<UserCredentialDocument>,
  ) {}

  async create(createUserCredentialDto: CreateUserCredentialDto) {
    const { password: rawPassword, ...rest } = createUserCredentialDto;
    const password = await encodePassWord(rawPassword);
    const body = { ...rest, password };
    const createUserCredential = new this.userCredentialModel(body);
    return await createUserCredential.save();
  }

  async findAll(): Promise<CreateUserCredentialDto[]> {
    return await this.userCredentialModel.find();
  }

  async findOne(employeeNo: string) {
    return await this.userCredentialModel.findOne({ employeeNo });
  }

  update(username: string, updateUserCredentialDto: UpdateUserCredentialDto) {
    return `This action updates a #${username} userCredential`;
  }

  remove(username: string) {
    return `This action removes a #${username} userCredential`;
  }
}
