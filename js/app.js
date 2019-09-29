/*
* @Author: Admin
* @Date:   2019-09-29 19:36:22
* @Last Modified by:   Admin
* @Last Modified time: 2019-09-30 06:16:40
*/
console.log("开始了")

/**
 * 获取屏幕的高度
 * @return {number} 屏幕的高度
 */
function getH(){
    return window.screen.availHeight
}
/**
 * JSON-map 对对象进行遍历操作
 * @param {Object}   object   需要遍历的对象
 * @param {Function} callback 回调函数
 */
function Jmap(object,callback){
    var key = Object.keys
    if(typeof object === "object"){
        var list = key(object);
        for(let i=0;i<list.length;i++){
            callback(list[i],object[list[i]])
        }
    }
}
/**
 * 给元素添加属性
 * @param {Element|NodeList} ele    元素或者节点列表
 * @param {Object} config JSON数据
 */
function addAttr(ele,config){
    Jmap(config,function(index,el){
        ele.setAttribute(`${index}`,el)
    });
}

/**
 * 添加Css样式
 * @param {Element|NodeList} el     目标元素或者元素列表
 * @param {Object} config Css样式的Json数据
 */
function addCss(el,config){
    var key = Object.keys;
    var cssList = key(config);
    if(el.length){
        for(let n=0;n<el.length;n++){
            addCss(el[n],config)
        }
    }
    for(let i=0;i<cssList.length;i++){
        el.style[cssList[i]]=config[cssList[i]];
    }
}

window.onload=function(){
    var EleContent = document.getElementById("contentv");
    var screenHeight=getH()-40;
    addCss(EleContent,{
        "height":`${screenHeight}px`
    });
}