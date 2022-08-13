import { ClassIDS } from "../../types"

export enum Stages {
    Stage0,
    Stage1,
    SetManually,
    Schedule,
}

export type StageProps = {
    setStage: (stage: number) => void
}

export type CL = {
    classID: ClassIDS
    period: number
    name: string
    teacher: {
        name: string,
        id: string
    }
    room: string,

}

export type ManualResult = {
    classes: CL[],
    lunch: number
}

export function emptyCL(amt: number): CL[] {
    return [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period,
            period: i,
            name: "",
            teacher: {
                name: "",
                id: ""
            },
            room: ""
        }
    })
    
}