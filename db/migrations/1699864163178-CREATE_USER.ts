import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATEUSER1699864163178 implements MigrationInterface {
    name = 'CREATEUSER1699864163178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'phone', type: 'varchar', length: '30', isNullable: true },
                    { name: 'email', type: 'varchar', isNullable: true },
                    { name: 'rank', type: 'tinyint', isNullable: true },
                    { name: 'first_name', type: 'varchar', length: '100', isNullable: true },
                    { name: 'last_name', type: 'varchar', length: '100', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
