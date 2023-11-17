import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ADDPOINTTOGIFTREDEEM1700126432799 implements MigrationInterface {
    name = 'ADDPOINTTOGIFTREDEEM1700126432799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('gift_redeems', [
            new TableColumn({ name: 'point', type: 'integer', isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('gift_redeems', ['point']);
    }
}
