import { EventEmitter } from 'events';

import { classToPlain } from 'class-transformer';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

import { BaseEntity } from './base.entity';

export class BaseRepository<Model extends BaseEntity> extends EventEmitter {
  constructor(protected readonly model: Repository<Model>) {
    super();
    this.model = model;
  }

  async create(entity: DeepPartial<Model>): Promise<Model> {
    return classToPlain(await this.model.save(entity)) as Model;
  }

  async createMultipleEntities(entities?: DeepPartial<Model>[]): Promise<Array<Model>> {
    return classToPlain(await this.model.save(entities)) as Array<Model>;
  }

  async findRaw(options: FindOneOptions<Model>): Promise<Model> {
    return await this.model.findOne(options);
  }

  async findAndCount(options?: FindManyOptions<Model>): Promise<[Model[], number]> {
    const [items, count] = await this.model.findAndCount(options);
    return [classToPlain(items) as Model[], count];
  }

  async count(options?: FindManyOptions<Model>): Promise<number> {
    const count = await this.model.count(options);
    return count;
  }

  async updateItem(entity: DeepPartial<Model>): Promise<Model> {
    return classToPlain(await this.model.save(entity)) as Model;
  }

  merge(oldEntity: Model, entity: DeepPartial<Model>): Model {
    return classToPlain(this.model.merge(oldEntity, entity)) as Model;
  }
  async preload(entity: DeepPartial<Model>): Promise<Model> {
    return classToPlain(await this.model.preload(entity)) as Model;
  }
  async save(entity: DeepPartial<Model>): Promise<Model> {
    return classToPlain(await this.model.save(entity)) as Model;
  }

  async paginationQueryBuilder(
    queryBuilder: SelectQueryBuilder<Model>,
    options: IPaginationOptions,
  ): Promise<Pagination<Model, IPaginationMeta>> {
    const pgResult = await paginate(queryBuilder, options);
    return {
      ...pgResult,
      items: classToPlain(pgResult.items) as any,
    };
  }


  getModel(): Repository<Model> {
    return this.model;
  }

  async findOneBy(field: string, value: any): Promise<any> {
    const whereClause = {};
    whereClause[field] = value;

    const foundModel = await this.model.findOne({
        where: whereClause
    });

    return foundModel;
  }

  async update(id: string, model: any): Promise<{result: string}> {
      const updateResult = await this.model.update(id, model as any);

      return {result: 'success'};
  }
}
