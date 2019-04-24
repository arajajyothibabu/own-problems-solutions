/**
 * Gives selector for given DOM element which we use to select using querySelector
 * @param {DomElement} node 
 */

const getSelector = (node) => {
    let name = "";
    if (node && node.localName) {
        name = node.localName; //tag name
        if (name === "html") { //DOM root FIXME: not sure with this
            return name;
        }
        if (node.hasAttribute && node.hasAttribute("id")) { //checking for id
            name += `#${node.getAttribute("id")}`;
        } else {
            if (node.classList && node.classList.length) { //checking for classes
                name += `.${node.className.replace(" ", ".")}`;
            }
            if (node.parentNode) { //going upwards in the DOM tree
                const similarChildren = node.parentNode.querySelectorAll(name);
                if (similarChildren.length > 1) { //more than one similar node
                    const index = Array.prototype.indexOf.call(node.parentNode.children, node) + 1;
                    name = getSelector(node.parentNode) + `:nth-child(${index}) > ` + name;
                } else { //only unique child
                    name = getSelector(node.parentNode) + ' > ' + name;
                }
            }
        }
    }
    return name;
}
const selector = getSelector(document.querySelector("span"));
console.log(selector);
console.log(document.querySelector(selector).innerHTML);