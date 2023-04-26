import { ComponentChildren } from 'preact';
import { SxProps, Theme, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export default function BoldHTag(props: { children: ComponentChildren; varient?: Variant; gutterBottom?: boolean; sx?: SxProps<Theme> }) {
    return (
        <Typography variant={props.varient || 'h1'} gutterBottom={props.gutterBottom || true} sx={props.sx}>
            <strong>{props.children}</strong>
        </Typography>
    );
}
