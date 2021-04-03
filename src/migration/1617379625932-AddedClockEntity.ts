import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedClockEntity1617379625932 implements MigrationInterface {
    name = 'AddedClockEntity1617379625932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clock" ("id" SERIAL NOT NULL, "entry" TIMESTAMP NOT NULL, "UserId" integer, CONSTRAINT "PK_f5e432be52c8e5686e4d31269ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clock" ADD CONSTRAINT "FK_df5093dcd159ce99442349d4a03" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock" DROP CONSTRAINT "FK_df5093dcd159ce99442349d4a03"`);
        await queryRunner.query(`DROP TABLE "clock"`);
    }

}
