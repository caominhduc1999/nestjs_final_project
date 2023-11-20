import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATEADMIN1700461258455 implements MigrationInterface {
    name = 'CREATEADMIN1700461258455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'admins',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'email', type: 'varchar', isNullable: true },
                    { name: 'password', type: 'varchar', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('admins');
    }

}
