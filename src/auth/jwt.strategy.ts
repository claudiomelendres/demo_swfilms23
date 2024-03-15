import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        configService: ConfigService,
    ) {
        super(
            {
                secretOrKey: configService.get('JWT_SECRET'),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            }
        );
    }

    async validate(payload: { id: string }): Promise<any> {
        const { id } = payload;

        const user = await this.userRepository.findOneBy({ id: id });

        if (!user)
            throw new UnauthorizedException('Invalid token data');

        if (!user.isActive)
            throw new UnauthorizedException('User is not active');

        return user;
    }


}