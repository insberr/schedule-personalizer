import { ComponentChildren, Ref } from 'preact';
import { CSSProperties } from 'preact/compat';

type CenterProps = {
    children: ComponentChildren;
    className?: string;
    style?: CSSProperties;
    ref?: Ref<HTMLDivElement>;
    noDFlex?: boolean;
    noVW?: boolean;
};

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
        <div
            ref={props.ref}
            className={
                'text-center justify-content-center  ' +
                (props.noVW ? '' : ' vw-100 ') +
                (props.noDFlex ? '' : ' d-flex ') +
                (props.className ? props.className : '')
            }
            style={props.style}
        >
            <div className="w-auto">{props.children}</div>
        </div>
    );
}

export default Center;
