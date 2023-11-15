import { Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import {plainToInstance} from 'class-transformer';
import { BaseDto } from "./base.dto";

export class BaseService<Entity extends BaseEntity, Dto> {
    constructor(protected repo: Repository<Entity>, protected dtoClass: new () => Dto) {

    }

    async findAll(): Promise<any> {
        
        const models = this.repo.find();

        return plainToInstance(this.dtoClass, models, {
            excludeExtraneousValues: true
        });
    }


    async save(model: Dto): Promise<any> {
        const savedModel = this.repo.save(model as any);

        return plainToInstance(this.dtoClass, savedModel, {
            excludeExtraneousValues: true
        });
    }

    async update(id: string, model: Dto): Promise<{result: string}> {
        const updateResult = await this.repo.update(id, model as any);

        return {result: 'success'};
    }

    async findOne(id: string): Promise<any> {
        const foundModel = await this.repo.findOne({
            where: {
                id: id as any
            }
        });

        return plainToInstance(this.dtoClass, foundModel, {
            excludeExtraneousValues: true
        })
    }

    async deleteById(id: string): Promise<{result: string}> {
        const deleteResult = await this.repo.delete(id);
        
        return {result: 'success'};
    }
}