import { BaseEntity } from "../base-entity.models";
import { Speed } from "../speed/speed.models";

export class Penalties extends BaseEntity {
    description: string = '';
    time: number = 0;
    idSpeed: number | null = null;
    speed: Speed = new Speed();
}