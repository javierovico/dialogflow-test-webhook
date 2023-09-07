import * as stream from "stream";
import { Writable } from "stream";
// import ffmpeg from 'fluent-ffmpeg';
import * as fs from "fs";
import path from "path";

async function base64ToReadable(base64String: string): Promise<stream.Readable> {
    const buffer = Buffer.from(base64String, 'base64');
    let offset = 0;
    return new stream.Readable({
        read(size) {
            if (offset >= buffer.length) {
                this.push(null); // No more data to push
            } else {
                const chunk = buffer.slice(offset, offset + size);
                offset += size;
                this.push(chunk);
            }
        }
    });
}



function obtenerFormatoDefault(entrada?: string): string | undefined {
    // Expresión regular para buscar el formato entre barras y posiblemente seguido de otros caracteres
    const formatoRegex = /\/([^/\s]+)/;
    const match = entrada?.match(formatoRegex);
    if (match && match[1]) {
        return match[1];
    }
    return undefined
}
export function getExtensionFromMimeType(mimeType: string): string|undefined {
    const mimeTypeToExtension: Record<string, string> = {
        "image/jpeg": "jpg",
        "audio/ogg; codecs=opus": "ogg",
        'video/mp4': 'mp4'
    };

    return mimeTypeToExtension[mimeType] ?? obtenerFormatoDefault(mimeType)
}

export function convertFileToBase64(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                reject(error);
            } else {
                const base64Data = data.toString('base64');
                resolve(base64Data);
            }
        });
    });
}
