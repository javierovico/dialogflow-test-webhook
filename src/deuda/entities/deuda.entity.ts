import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contacto } from "../../contacto/entities/contacto.entity";

export const DEUDA_COLUMNA_CONTACT_ID = 'contact_id'
export const DEUDA_COLUMNA_TIPO_DEUDA = 'tipo_deuda'
export const DEUDA_COLUMNA_FECHA_VENCIMIENTO = 'fecha_vencimiento'
export const DEUDA_COLUMNA_FECHA_PROMESA = 'fecha_promesa'
export const DEUDA_COLUMNA_MONTO_DEUDA = 'monto_deuda'
export const DEUDA_COLUMNA_FECHA_CONTACTADA = 'fecha_contactada'

@Entity()
export class Deuda {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    sesion: string

    @ManyToOne(() => Contacto, (c) => c.deudas, {onDelete: 'CASCADE'})
    @JoinColumn({name: DEUDA_COLUMNA_CONTACT_ID})
    contact: Contacto

    @Column({name: DEUDA_COLUMNA_TIPO_DEUDA})
    tipoDeuda: string

    @Column({type:'datetime', name: DEUDA_COLUMNA_FECHA_VENCIMIENTO})
    fechaVencimiento: Date

    @Column({name: DEUDA_COLUMNA_MONTO_DEUDA, nullable: true})
    montoDeuda: number

    @Column({type:'datetime', name: DEUDA_COLUMNA_FECHA_PROMESA, nullable: true})
    fehaPromesa: Date

    @Column({type:'datetime', name: DEUDA_COLUMNA_FECHA_CONTACTADA, nullable: true})
    fechaContactada: Date
}
