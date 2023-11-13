import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATEGIFT1699864646359 implements MigrationInterface {
    name = 'CREATEGIFT1699864646359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'gifts',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'point', type: 'int', isNullable: true },
                    { name: 'image', type: 'varchar', isNullable: true },
                    { name: 'expired_date', type: 'date', isNullable: true },
                    { name: 'quantity', type: 'int', isNullable: true },
                    { name: 'description', type: 'text', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('gifts');
    }

}
