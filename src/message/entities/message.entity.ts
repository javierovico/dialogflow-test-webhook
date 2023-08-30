import {
    BeforeInsert,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany, Unique
} from "typeorm";
import {Contacto} from "../../contacto/entities/contacto.entity";
import {DateTime} from 'luxon'
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from "uuid";
import { getExtensionFromMimeType } from "../../utils/utils";


export function filenameUnique(fecha: DateTime, mimeType: string, filename: string|undefined) {
    return `file_${fecha.toUTC().toFormat('HHmmss')}_${uuidv4().slice(0,8)}_` + (filename ?? ('media.' + (getExtensionFromMimeType(mimeType) ?? '.raw')))
}

export const RELATIVE_MESSAGE_DATA_PATH = 'media/message'

export const TABLA_MESSAGE = 'message'
export const MESSAGE_COLUMNA_PATH_MEDIA = 'path_media'
export const MESSAGE_COLUMNA_MEDIA = 'media'

export const MESSAGE_COLUMNA_FECHA_MENSAJE = 'fecha_mensaje'
export const MESSAGE_COLUMNA_CONTACT_ID = 'contact_id'

interface Ubicacion {
    latitud: number,
    longitud: number
}

interface DataObject {
    texto?: string,
    ubicacion?: Ubicacion,
    mimeType?: string,
    filename?: string,
    traduccionAudio?: string,
    error?: string
}

export enum TypeMessage {
    TYPE_SENT = 'sent',
    TYPE_RECEIVED = 'received',
}

export const TIPO_PTT = "audio/ogg"
export const TIPO_IMG = "image/jpeg"


@Entity(TABLA_MESSAGE)
@Unique(["code_cliente", "contactId"])
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code_cliente: string

    @Column({name: MESSAGE_COLUMNA_CONTACT_ID})
    contactId: number

    @ManyToOne(() => Contacto, (c) => c.mensajes, { onDelete: 'CASCADE'})
    @JoinColumn({name: MESSAGE_COLUMNA_CONTACT_ID})
    contact: Contacto

    @Column('varchar', {nullable: true, name: MESSAGE_COLUMNA_PATH_MEDIA})
    path_media: string|null

    @Column({type: 'simple-json', nullable: true, collation: 'utf8mb4_general_ci'})
    data: DataObject = {}

    @Column({type: 'enum', enum: TypeMessage, default: TypeMessage.TYPE_RECEIVED})
    type: TypeMessage

    @Column({type:"datetime", name: MESSAGE_COLUMNA_FECHA_MENSAJE})
    fecha_mensaje: Date

    @BeforeInsert()
    updateDates() {
        if (!this.fecha_mensaje) {
            this.fecha_mensaje = DateTime.now().toJSDate();
        }
    }


    /**
     * Guarda el archivo en la carpeta local
     * actualiza el path_media y de paso mimetype y filename (opcionales)
     * @param base64Data
     * @param mimeType
     * @param cuentaId
     * @param filename
     */
    async generatePathFromBase64(base64Data: string, mimeType: string, cuentaId: number, filename?:string) {
        const fechaMensaje = DateTime.fromJSDate(this.fecha_mensaje).toUTC()
        const relativeFolder = `${cuentaId}/${fechaMensaje.toFormat('yyyy/MM/dd')}`
        const mediaFolderPath = path.resolve(`${RELATIVE_MESSAGE_DATA_PATH}/${relativeFolder}`)
        this.data.mimeType = mimeType
        this.data.filename = filename
        const name: string = filenameUnique(fechaMensaje, mimeType, filename)
        const mediaPath = path.join(mediaFolderPath, name); // You can choose the appropriate extension
        const buffer = Buffer.from(base64Data, 'base64');
        fs.mkdirSync(mediaFolderPath, {recursive: true});
        await fs.promises.writeFile(mediaPath, buffer);
        this.path_media = `${relativeFolder}/${name}`
    }
}
