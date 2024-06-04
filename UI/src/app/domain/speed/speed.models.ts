import { BaseEntity } from "../base-entity.models";
import { Penalties } from "../penalties/penalties.model";
import { Squad } from "../squad/squad-model";

export class Speed extends BaseEntity {
    time: number = 0;
    timeWithoutPenalties: number = 0;
    ranking: number = 0;
    score: number = 0;
    idSquad: number = 0;
    burnedStart: boolean = false;
    outsideLine: number = 0;
    cutWay: number = 0;
    squad: Squad = new Squad();
    penalties: Penalties[] = [];
}