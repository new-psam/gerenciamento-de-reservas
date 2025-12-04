import { EntityTarget, Repository } from "typeorm"
import { appDataSource } from "../typeorm/typeorm";

export class BaseRepository<T extends { id?: string }> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = appDataSource.getRepository(entity);
    }
}