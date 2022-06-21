import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form"
import { ordinal_suffix_of } from "../../../lib"
type Props = {
    lunchamt: number,
    setl: (lunch: number) => void
    l: number;
}
export function LunchPicker(props: Props) {
    return (<div>
        <h3 className="mb-3">Lunch</h3>
        {[...Array(props.lunchamt)].map((_,ln) => {
            return <><Form.Check className="d-inline-block mb-1" onChange={() => {props.setl(ln)}} checked={props.l==ln} key={"lunch"+ln} label={ordinal_suffix_of(ln+1)} name="lunchpick" type="radio"/><br /></>
        })}
    </div>)
}