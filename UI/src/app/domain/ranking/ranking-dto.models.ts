import { BaseEntity } from "../base-entity.models";

export class RankingDto extends BaseEntity {
    squadName: string = '';
    carNumber: string = '';
    ranking: number = 0;
    score: number = 0;
    speedTime: number | null = null;
    rampDistance: number | null = null;
    tractionWeight: number | null = null;
}