import { ClassIDS, Time } from ".";
import { Customizations } from ".";

export type Stdata = {
  studentVue: StudentVue;
  terms: Term[];
  customizations: Customizations;
};

export type StudentVue = {
  stayLoggedIn: boolean;
  username: string;
  password: string;
};

export type CL = {
  classID: ClassIDS;
  period: number;
  name: string;
  teacher: {
    name: string;
    email: string;
    id: string;
  };
  room: string;
};
export type Term = {
  isFake?: boolean;
  termIndex: number;
  startDate: Date;
  endDate: Date;
  classes: CL[] | [];
};

export type Terms = Term[];

export type Class = {
  classID: ClassIDS;
  customID?: number;
  // number[] is because of my start at bnuilding multiLunches
  period: number | number[] | undefined;
  name: string;
  room: string | number;
  teacher: Teacher;
  // these times should be what studentvue says
  startTime: Time;
  endTime: Time;
};

export type Teacher = {
  name: string;
  email: string;
  id: string;
};
