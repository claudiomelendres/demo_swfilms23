import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'planets' })
export class Planet {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    name: string

    @Column({
        type: 'text',
        nullable: true,
    })
    climate: string;

    @Column('int', {
        default: 0
    })
    population: number;
}