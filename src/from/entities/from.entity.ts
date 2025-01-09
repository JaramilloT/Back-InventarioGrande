import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('inventario')  
export class From {
    @PrimaryGeneratedColumn()
    id_inventario: number;
  
    @Column()
    dependencia: string;
  
    @Column()
    activo: string;

    @Column()
    codigo: string;

    @Column()
    responsable: string;

    @Column()
    cargo: string;

    @DeleteDateColumn()
    deletedAt?: Date;
}
