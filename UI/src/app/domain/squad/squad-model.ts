import { Student } from "../student/student-model";
import { BaseEntity } from "../base-entity.models";
import { Ramp } from "../ramp/ramp.models";
import { Traction } from "../traction/traction.models";
import { Speed } from "../speed/speed.models";

export class Squad extends BaseEntity {
    name: string = '';
    carNumber: string = '';
    student: Student[] = [];
    ramp: Ramp[] = [];
    speed: Speed[] = [];
    traction: Traction[] = [];
}