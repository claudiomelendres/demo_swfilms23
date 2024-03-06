import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";


@Entity({ name: 'film_medias' })
export class FilmMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @Column({ type: 'text', nullable: true })
    type: string;

    @ManyToOne(() => Film, film => film.medias, { onDelete: 'CASCADE' })
    film: Film
}