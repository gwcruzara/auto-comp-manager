import { BaseEntity } from "../base-entity.models";
import { Squad } from "../squad/squad-model";

export class Ramp extends BaseEntity {
    distance: number = 0;
    ranking: number = 0;
    score: number = 0;
    idSquad: number = 0;
    squad: Squad = new Squad();
}