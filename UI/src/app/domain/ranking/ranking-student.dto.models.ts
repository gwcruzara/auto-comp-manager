import { BaseEntity } from "../base-entity.models";

export class RankingStudentDto extends BaseEntity {
    squadName: string = '';
    studentName: string = '';
    ranking: number = 0;
    score: number = 0;
    speedTime: number | null = null;
    rampDistance: number | null = null;
    tractionWeight: number | null = null;
}