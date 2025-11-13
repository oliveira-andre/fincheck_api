import { Injectable } from '@nestjs/common';

import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepositories) {}

  async getUserById(id: string) {
    // return this.usersRepo.findUnique({
    //   where: { id },
    // });
    return { id };
  }
}
