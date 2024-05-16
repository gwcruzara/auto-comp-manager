import { BaseEntity } from "../base-entity.models";
import { Speed } from "../speed/speed.models";

export class Penalties extends BaseEntity {
    description: string = '';
    time: number = 0;
    idSpeed: number = 0;
    speed: Speed = new Speed();
}