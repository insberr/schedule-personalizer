import { Box } from '@mui/material';
import { ComponentChildren, Ref } from 'preact';
import { CSSProperties } from 'preact/compat';

type CenterProps = {
    children: ComponentChildren;
    className?: string;
    style?: CSSProperties;
    ref?: Ref<unknown>;
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
        <Box
            sx={{
                display: props.noDFlex ? '' : 'flex',
                viewWidth: props.noVW ? '' : '100vw',
                justifyContent: 'center',
                textAlign: 'center',
            }}
            className={props.className ? props.className : ''}
            style={props.style}
        >
            <div>{props.children}</div>
        </Box>
    );
}

export default Center;
