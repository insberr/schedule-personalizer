const { parser } = require("posthtml-parser");
const { readFileSync } = require("fs");

// if you can find a way to somehow make this a .posthtmlrc file that would be great

module.exports = 
    {
        plugins: [
            p1()
        ]
    }



function p1() {
    return (tree) => {
        tree.match({tag:"head"}, (node) => {
            const parsed = parser(readFileSync(__dirname+"/src/splashscreens/splash.html","utf8"));
            parsed.forEach((n) => {
                if (!n.attrs) {
                    return;
                }
                if (!n.attrs.href) {
                    return
                }
                n.attrs.href = n.attrs.href.replace("src/","./")
                node.content.push(n);
            })
            
            return node
        })
        return tree
    }
}