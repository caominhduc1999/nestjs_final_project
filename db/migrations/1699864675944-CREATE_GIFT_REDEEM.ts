import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATEGIFTREDEEM1699864675944 implements MigrationInterface {
    name = 'CREATEGIFTREDEEM1699864675944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'gift_redeems',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'store_id', type: 'int', isNullable: true },
                    { name: 'user_id', type: 'int', isNullable: true },
                    { name: 'gift_id', type: 'int', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('gift_redeems');
    }

}
