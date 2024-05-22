import { BaseEntity } from "../base-entity.models";

export class SpeedDto extends BaseEntity {
    time: number = 0;
    ranking: number = 0;
    score: number = 0;
    idSquad: number = 0;
}