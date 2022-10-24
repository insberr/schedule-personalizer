declare module '*.module.css';
declare module '*.module.scss';
declare module '@karmaniverous/serify-deserify';
declare module 'use-react-screenshot';
declare module '*.mdx' {
    let MDXComponent: (props) => JSX.Element;
    export default MDXComponent;
}
