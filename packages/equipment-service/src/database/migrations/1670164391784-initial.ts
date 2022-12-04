import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1670164391784 implements MigrationInterface {
    name = 'initial1670164391784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "platforms" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_2d4ddc024b28f4069798478bb6f" UNIQUE ("uuid"), CONSTRAINT "PK_3b879853678f7368d46e52b81c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."weapons_type_enum" AS ENUM('Assault Rifle')`);
        await queryRunner.query(`CREATE TABLE "weapons" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."weapons_type_enum" NOT NULL, "platformId" integer NOT NULL, CONSTRAINT "UQ_8451b939fee0a89854619a51e31" UNIQUE ("uuid"), CONSTRAINT "PK_a102f55ffbab023a922ac10ab76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attachments_attachmentslot_enum" AS ENUM('Barrel', 'Muzzle', 'Underbarrel')`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "attachmentSlot" "public"."attachments_attachmentslot_enum" NOT NULL, "tuning" jsonb, CONSTRAINT "UQ_9f90471c974587aa09622e3c1d3" UNIQUE ("uuid"), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weapon_attachments" ("weaponsId" integer NOT NULL, "attachmentsId" integer NOT NULL, CONSTRAINT "PK_900a775e6becd393cfd3581b88e" PRIMARY KEY ("weaponsId", "attachmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9049cd5a76fec483e5f3e7bc5a" ON "weapon_attachments" ("weaponsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c06dc9fa30b7b05ffbdc7c6ca5" ON "weapon_attachments" ("attachmentsId") `);
        await queryRunner.query(`ALTER TABLE "weapons" ADD CONSTRAINT "FK_64a54e32f3074f9fff1e676a19e" FOREIGN KEY ("platformId") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" ADD CONSTRAINT "FK_9049cd5a76fec483e5f3e7bc5a6" FOREIGN KEY ("weaponsId") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" ADD CONSTRAINT "FK_c06dc9fa30b7b05ffbdc7c6ca5f" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weapon_attachments" DROP CONSTRAINT "FK_c06dc9fa30b7b05ffbdc7c6ca5f"`);
        await queryRunner.query(`ALTER TABLE "weapon_attachments" DROP CONSTRAINT "FK_9049cd5a76fec483e5f3e7bc5a6"`);
        await queryRunner.query(`ALTER TABLE "weapons" DROP CONSTRAINT "FK_64a54e32f3074f9fff1e676a19e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c06dc9fa30b7b05ffbdc7c6ca5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9049cd5a76fec483e5f3e7bc5a"`);
        await queryRunner.query(`DROP TABLE "weapon_attachments"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TYPE "public"."attachments_attachmentslot_enum"`);
        await queryRunner.query(`DROP TABLE "weapons"`);
        await queryRunner.query(`DROP TYPE "public"."weapons_type_enum"`);
        await queryRunner.query(`DROP TABLE "platforms"`);
    }

}
