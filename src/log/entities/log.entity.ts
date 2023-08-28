import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { DateTime } from "luxon";
import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer";


interface InputInterface {
    id: number
}

interface OutputInterface {
    id: number
}

export enum TypeLog {
    TYPE_WHATSAPP = 'whatsapp',
    TYPE_VERTEX = 'vertex',
    TYPE_VOZ_TO_TEXT = 'voz_to_text',
    TYPE_IMG_TO_TEXT = 'img_to_text',
    TYPE_ERROR_GENERAL = 'error_generl'
}

export const TABLA_LOG = 'logs'
export const LOG_COLUMNA_TYPE = 'type'

const transformer: ValueTransformer = {
    to(value: any): string {
        return JSON.stringify(value);
    },
    from(value: string): any {
        return JSON.parse(value);
    },
}

@Entity(TABLA_LOG)
@Index('index_type', ['type', 'fecha_lectura'])
export class Logs {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_general_ci', transformer })
    input: InputInterface;

    @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_general_ci', transformer })
    output: OutputInterface

    @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_general_ci', transformer })
    error: OutputInterface

    @Column("datetime")
    fecha_lectura: Date

    @Column({type: 'varchar', default: TypeLog.TYPE_WHATSAPP, name: LOG_COLUMNA_TYPE})
    type: TypeLog

    @BeforeInsert()
    updateDates() {
        this.fecha_lectura = DateTime.utc().toJSDate()
    }
}
