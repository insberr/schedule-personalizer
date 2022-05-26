import React from "react";
type CenterProps = {
    children: React.ReactNode
    className?: string
}

function Center(props: CenterProps) {
    /*
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
    )*/
    return (
        <div className={"d-flex justify-content-center w-100" + props.className ? props.className : ""}>
            <div className="w-auto">
                { props.children }
            </div>
        </div>
    )
}
export default Center