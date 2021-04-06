import { injectable } from "inversify";
import { Repository, createQueryBuilder, InsertResult, Brackets } from "typeorm";
import { Clock } from "./entity/clock.entity";
import { ClockDTO } from "./dto/clock.dto";
import { QueryResultCache } from "typeorm/cache/QueryResultCache";

@injectable()
export class ClockRepository extends Repository<Clock> {
  // insert
  public async insertEntry(clockDto: ClockDTO): Promise<InsertResult> {
    const entity = Object.assign(new Clock(), {
      _user: clockDto.userId,
      entry: clockDto.entry,
      day: clockDto.day,
      month: clockDto.month,
      year: clockDto.year,
    });

    return await createQueryBuilder()
      .insert()
      .into(Clock)
      .values(entity)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });
  }

  // check hits per day
  public async checkHits(id: number, day: number, month: number, year: number): Promise<Clock[]> {
    return await createQueryBuilder(Clock, "clock")
      .where("clock.UserId = :id", { id: id })
      .andWhere("clock.day = :day", { day: day })
      .andWhere("clock.month = :month", { month: month })
      .andWhere("clock.year = :year", { year: year })
      .getMany();
  }
}
