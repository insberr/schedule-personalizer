import { schObject, ClassIDS } from "../../types"

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
    /*
    const classesObject: schObject = {}
    const keys = [-1, 1, 2, 3, 4 ,5]

    for (const i of keys) {
        classesObject[i] = {
            name: "",
            teacher: {
                name: "",
                id: ""
            },
            room: ""
        }
    }
    return classesObject
    */

    return [...Array(amt)].map((v, i) => {
        return {
            classID: ClassIDS.Period, // for now
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