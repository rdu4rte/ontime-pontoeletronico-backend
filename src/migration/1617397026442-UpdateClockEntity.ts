import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateClockEntity1617397026442 implements MigrationInterface {
    name = 'UpdateClockEntity1617397026442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock" ADD "day" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clock" ADD "month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clock" DROP COLUMN "entry"`);
        await queryRunner.query(`ALTER TABLE "clock" ADD "entry" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock" DROP COLUMN "entry"`);
        await queryRunner.query(`ALTER TABLE "clock" ADD "entry" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clock" DROP COLUMN "month"`);
        await queryRunner.query(`ALTER TABLE "clock" DROP COLUMN "day"`);
    }

}
