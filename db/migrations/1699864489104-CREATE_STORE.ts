import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CREATESTORE1699864489104 implements MigrationInterface {
    name = 'CREATESTORE1699864489104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stores',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', length: '100', isNullable: true },
                    { name: 'phone', type: 'varchar', length: '30', isNullable: true },
                    { name: 'email', type: 'varchar', isNullable: true },
                    { name: 'code', type: 'varchar', isNullable: true },
                    { name: 'is_approved', type: 'tinyint', isNullable: true },
                    { name: 'address', type: 'varchar', length: '100', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stores');
    }
}
