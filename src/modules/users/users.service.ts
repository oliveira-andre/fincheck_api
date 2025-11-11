import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepositories) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('Email already taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'travel', type: 'INCOME'},
              { name: 'Freelance', icon: 'freelance', type: 'INCOME'},
              { name: 'Outros', icon: 'other', type: 'INCOME'},
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE'},
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE'},
              { name: 'Educação', icon: 'education', type: 'EXPENSE'},
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE'},
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE'},
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE'},
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE'},
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE'},
              { name: 'Outros', icon: 'other', type: 'EXPENSE'},
            ],
          },
        }
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
