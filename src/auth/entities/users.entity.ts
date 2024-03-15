import { Film } from "src/films/entities/film.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;


    @Column('text', { array: true, default: ['user'] })
    roles: string[];

    @OneToMany(() => Film, (film) => film.user)
    films: Film;

}

