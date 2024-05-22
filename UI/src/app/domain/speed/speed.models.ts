import { BaseEntity } from "../base-entity.models";
import { Penalties } from "../penalties/penalties.model";
import { Squad } from "../squad/squad-model";

export class Speed extends BaseEntity {
    time: number = 0;
    ranking: number = 0;
    score: number = 0;
    idSquad: number = 0;
    burnedStart: boolean = false;
    outsideLine: boolean = false;
    cutWay: boolean = false;
    squad: Squad = new Squad();
    penalties: Penalties[] = [];
}