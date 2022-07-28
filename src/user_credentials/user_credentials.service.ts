import { Injectable } from '@nestjs/common';
import { CreateUserCredentialDto } from './dto/create-user_credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user_credential.dto';

export type User = {
  id: number;
  username: string;
  name: string;
  password: string;
};

@Injectable()
export class UserCredentialsService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'JM',
      username: 'admin',
      password: 'adminPassword',
    },
    {
      id: 2,
      name: 'JMC',
      username: 'user',
      password: 'userPassword',
    },
  ];

  create(createUserCredentialDto: CreateUserCredentialDto) {
    return 'This action adds a new userCredential';
  }

  findAll() {
    return `This action returns all userCredentials`;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(username: string, updateUserCredentialDto: UpdateUserCredentialDto) {
    return `This action updates a #${username} userCredential`;
  }

  remove(username: string) {
    return `This action removes a #${username} userCredential`;
  }
}
