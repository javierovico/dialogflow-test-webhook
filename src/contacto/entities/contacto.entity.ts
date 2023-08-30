import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../../message/entities/message.entity";
import { Deuda } from "../../deuda/entities/deuda.entity";

export enum GeneroPersona {
    GENERO_INDEFINIDO = 'indefinido',
    GENERO_HOMBRE = 'hombre',
    GENERO_MUJER = 'mujer'
}

@Entity()
export class Contacto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", charset: "utf8mb4"})
    code_cliente: string

    @OneToMany(() => Message, (message) => message.contact)
    mensajes?: Message[]

    @OneToMany(() => Deuda, (d) => d.contact)
    deudas?: Message[]

    @Column({charset: 'utf8mb4'})
    nombre: string

    @Column({type: 'enum', enum: GeneroPersona, default: GeneroPersona.GENERO_INDEFINIDO})
    genero: GeneroPersona

    @Column({type:"varchar", length: 20})
    telefono: string

}
