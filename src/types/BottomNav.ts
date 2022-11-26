import { Page } from '.';

export type Tab = {
    label: string;
    value: string;
    onClick: () => void;
    icon: JSX.Element;
};

