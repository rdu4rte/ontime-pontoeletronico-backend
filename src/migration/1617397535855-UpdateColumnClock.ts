import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumnClock1617397535855 implements MigrationInterface {
    name = 'UpdateColumnClock1617397535855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock" DROP COLUMN "year"`);
    }

}
