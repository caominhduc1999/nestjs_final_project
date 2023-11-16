import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ADDSTOREIDTOUSER1700099751768 implements MigrationInterface {
    name = 'ADDSTOREIDTOUSER1700099751768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({ name: 'store_id', type: 'int', isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', ['store_id']);
    }

}
