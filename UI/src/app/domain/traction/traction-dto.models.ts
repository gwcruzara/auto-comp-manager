import { BaseEntity } from "../base-entity.models";

export class TractionDto extends BaseEntity {
    weight: number = 0;
    ranking: number = 0;
    score: number = 0;
    idSquad: number = 0;
}