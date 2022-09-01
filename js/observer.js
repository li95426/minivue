class Observer{
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        //1.判断data是否是对象
        if(!data || typeof data != 'object'){
            return
        }
        //2.遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    // 调用Object.defineProperty把属性转换成getter和setter
    defineReactive(obj, key, val) {
        let that = this
        // 把data中的对象类型的子属性也转换成getter和setter
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 不能直接返回 obj[key],必须返回在外部传入的val，否则obj[val]会反复调用自己的get方法造成死递归
                // return obj[key]
                return val
            },
            set(newValue) {
                if(newValue === val) {
                    return
                }
                val = newValue
                // 如果给已存在的响应式数据赋值一个新对象类型的值，调用walk方法将其再次转换为响应式数据
                that.walk(newValue)
                // 发送通知
            }
        })
    }
}
