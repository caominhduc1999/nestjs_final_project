import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ADDCODETOUSER1700118683365 implements MigrationInterface {
    name = 'ADDCODETOUSER1700118683365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({ name: 'code', type: 'varchar', isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', ['code']);
    }

}
