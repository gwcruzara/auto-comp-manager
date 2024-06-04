import { BaseEntity } from "../base-entity.models";

export class SpeedDto extends BaseEntity {
    idSquad: number = 0;
    time: number = 0;
    burnedStart: boolean = false;
    outsideLine: number = 0;
    cutWay: number = 0;
}