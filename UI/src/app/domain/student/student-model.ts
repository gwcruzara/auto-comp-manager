import { BaseEntity } from "../base-entity.models";
import { Squad } from "../squad/squad-model";

export class Student extends BaseEntity {
    name: string = '';
    job: string = '';
    idSquad: number = 0;
    squad: Squad = new Squad();
}