import { useId } from "react";
import Center from "../../../components/Center";
import { ManualClassEntry } from "../components/ManualClassEntry";
import { StageProps } from "../types";



export function StageManually1(props: StageProps) {
    const classAmount = 6;
    return (
        <Center className="text-center"> 
            <h1 className="mb-3">Setup</h1>
            <div className="paper">
            {[...Array(classAmount)].map((_, i) => {
                return <ManualClassEntry key={"class"+i} />
            })}
            <div className="mb-3">
                Lunch picker goes here
            </div>
            <div className="mb-3">
                submit button goes here
            </div>
            </div>
        </Center>
        )

}