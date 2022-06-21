export type StageProps = {
    setStage: (stage: number) => void
}

export type CL = {
    name: string
    teacher: string
    room: string
}

export type ManualResult = {
    classes: CL[],
    lunch: number
}

export function emptyCL(amt: number): CL[] {
    return [...Array(amt)].map(() => {
        return {
            name: "",
            teacher: "",
            room: ""
        }
    })
}