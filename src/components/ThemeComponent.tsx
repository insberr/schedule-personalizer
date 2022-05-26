import { createPortal } from "react-dom";
import { Customizations } from "../types";

function generateCSS(custom: Customizations) {
    return '';//`* { color: magenta; }`
}

function ThemeInternal(props: {custom: Customizations}) {
    return <style dangerouslySetInnerHTML={{ __html: generateCSS(props.custom) }}></style>
}

function Theme(props: {custom: Customizations}) {
    return createPortal(<ThemeInternal custom={ props.custom } />, document.head) // the fact this actually fucking works amazes me!
}
export default Theme;