class Compiler{
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)) {
                // 处理文本节点
                this.compileText(node)
            }else if(this.isElementNode(node)){
                // 处理元素节点
                this.compileElement(node)
            }
            // 判断node节点是否有子节点，有子节点则递归调用compile
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node) {

    }
    // 编译文本节点，处理插值表达式
    compileText(node) {
        console.log(node)
    }
    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}