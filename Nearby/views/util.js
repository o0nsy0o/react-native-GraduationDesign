//工具模块

import {
    PixelRatio,
    Dimensions,
} from 'react-native';


let Util = {
    //单位像素
    pixel:1/PixelRatio.get(),
    //屏幕尺寸
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    post:function(url,data,callback){
        var fetchOptions = {
            method:'POST',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        };
        fetch(url,fetchOptions)
            .then((response)=>reaponse.json())//将返回的数据进行文本化
            .then((responseText)=>{
                callback(JSON.parse(responseText))//将文本化的返回值解析成json格式的数据
            })
            .catch((error)=>{
                console.log(error); 
            })
    },
    getJSON:function(url,callback){
        console.log(url);
        fetch(url)
            .then((response)=>response.text())
            .then((responseText)=>{
                callback(JSON.parse(responseText))//将文本化的返回值解析成json格式的数据
            })
            .catch((error) => {
                console.error(error);
            });
    },

    //高德地图key
    amapKey:'1ce2238d1a52e770b2b3b3b77bd71a81',
    //周边搜素服务
    searchURL:'https://restapi.amap.com/v3/place/around?',
    detailURL:'https://restapi.amap.com/v3/place/detail?',//ios9之后添加了一个新特性，只允许https链接。
}
export {Util};