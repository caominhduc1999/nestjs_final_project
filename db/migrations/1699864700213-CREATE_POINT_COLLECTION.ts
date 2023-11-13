import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATEPOINTCOLLECTION1699864700213 implements MigrationInterface {
    name = 'CREATEPOINTCOLLECTION1699864700213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'point_collections',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'user_id', type: 'int', isNullable: true },
                    { name: 'point', type: 'int', isNullable: true },
                    { name: 'order_value', type: 'double', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('point_collections');
    }

}
