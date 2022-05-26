import React from "react";
type CenterProps = {
    children: React.ReactNode
    className?: string
}

function Center(props: CenterProps) { 
    return (
    <div className={"container text-center" + props.className != undefined ? " " + props.className : ""}>
        <div className="row justify-content-center">
            <div className="col">
            </div>
            <div className="col-auto">
                {props.children}
            </div>
            <div className="col">
            </div>
        </div>
    </div>
    )
}
export default Center