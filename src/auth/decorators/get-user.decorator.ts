import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entities/users.entity';

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        // console.log({ request });

        if (!user)
            throw new InternalServerErrorException('User not found');

        return !data ? user : user[data];
        // si no existe la data devuelve todo el usuario 


    },
);