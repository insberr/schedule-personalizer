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
    name: string
    teacher: {
        name: string,
        id: string
    }
    room: string,

}

export type ManualResult = {
    classes: schObject,
    lunch: number
}

export function emptyCL(amt: number): schObject {
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
    
    /*
    [...Array(amt)].map(() => {
        return {
            name: "",
            teacher: {
                name: "",
                id: ""
            },
            room: ""
        }
    })
    */
}