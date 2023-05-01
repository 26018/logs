import router from "@/router/index.js";

export function navTo(path) {
    if ('number' === typeof path) {
        router.go(path);
        return;
    }
    if (router.currentRoute.value.fullPath === path) {
        return;
    }
    // 外部连接
    if (path.startsWith('http')) {
        window.location = path;
        return;
    }
    router.push(path).then(res => {

    }).catch(err => {
        console.error("路由错误：", err);
    });
}

export function equals(obj1, obj2) {
    let o1 = obj1 instanceof Object;
    let o2 = obj2 instanceof Object;
    // 判断是不是对象
    if (!o1 || !o2) {
        return obj1 === obj2;
    }

    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
    //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (let o in obj1) { // 遍历对象 fon in 循环 o 为 对象的属性名
        let t1 = obj1[o] instanceof Object;
        let t2 = obj2[o] instanceof Object;
        if (t1 && t2) {
            return equals(obj1[o], obj2[o]);
        } else if (obj1[o] !== obj2[o]) {
            return false;
        }
    }
    return true;
}
