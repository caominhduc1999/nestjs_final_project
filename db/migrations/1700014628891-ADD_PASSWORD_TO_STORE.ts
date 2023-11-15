import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ADDPASSWORDTOSTORE1700014628891 implements MigrationInterface {
    name = 'ADDPASSWORDTOSTORE1700014628891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('stores', [
            new TableColumn({ name: 'password', type: 'varchar', isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('stores', ['password']);
    }

}
