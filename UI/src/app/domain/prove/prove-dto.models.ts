import { Ramp } from "../ramp/ramp.models";
import { Speed } from "../speed/speed.models";
import { Traction } from "../traction/traction.models";

export class ProveDto {
    squadId: number = 0;
    ramp: Ramp = new Ramp();
    speed: Speed = new Speed();
    traction: Traction = new Traction();
}