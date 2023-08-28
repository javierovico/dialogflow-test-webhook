import { Injectable } from "@nestjs/common";
import { UpdateLogDto } from "./dto/update-log.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logs, TypeLog } from "./entities/log.entity";

@Injectable()
export class LogService {

    constructor(
        @InjectRepository(Logs) private logsRepository: Repository<Logs>
    ) {}

    async create(input: any, output?, type?: TypeLog) {
        const log = new Logs()
        log.input = input
        log.output = output
        if (type) {
            log.type = type
        }
        return (await this.logsRepository.save(log))
    }

    findAll() {
        return `This action returns all log`;
    }

    findOne(id: number) {
        return `This action returns a #${id} log`;
    }

    update(id: number, updateLogDto: UpdateLogDto) {
        return `This action updates a #${id} log`;
    }

    remove(id: number) {
        return `This action removes a #${id} log`;
    }
}
