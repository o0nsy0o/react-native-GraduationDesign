import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    ActionSheetIOS,
    WebView,
    AsyncStorage,
} from 'react-native';
import React, {Component} from 'react';
import {Util} from './util';
import Detail from './detail';
import Awebview from './Awebview';

export default class List extends Component{
    constructor(){
        super();//调用super方法继承父类的一些方法
        this.state={
            list:null,
            count:0,
            keywords:'',
        };
    }

    render(){
        var items =[];
        if(this.state.list){
            console.log(1);
            let len = this.state.list.length>10?10:this.state.list.length;
            for(let i=0;i<len;i++){
                console.log(2);
                let obj = this.state.list[i];
                items.push(
                    <TouchableOpacity
                        key = {i}//遍历生成的子组件，是需要一个key值的。key值写在根节点上。
                        style = {styles.item}
                        onPress = {this._loadDetail.bind(this,obj.id,obj.name,obj.location)}
                    >
                    <View style = {styles.row}>
                        <View style={{flex:1}}>
                            <Text numberOfLines={1} style={styles.name}>{obj.name}</Text>
                            <Text numberOfLines={1} style={styles.type}>{obj.type}</Text>
                        </View>
                        <View style={styles.distance}>
                            <Text numberOfLines={1} style={[styles.mi,{color:'#4C4C4C'}]}>
                                {obj.distance}米
                            </Text>
                            <Text numberOfLines={1} style={styles.address}>{obj.address}</Text>
                        </View>
                    </View>
                    {
                        obj.tel.length ?
                        (
                            <TouchableOpacity style={styles.phone}
                                onPress = {this._call.bind(this,obj.tel)}
                            >
                            <Text numberOfLines={1}>电话</Text>
                            </TouchableOpacity>
                            ):null
                    }
                    </TouchableOpacity>
                )
            }
        }
        var placeholder = '搜索' + this.props.type;
        return (
        <ScrollView style={styles.container}>
            <View style={styles.searchBg}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={this._onChangeText.bind(this)}
                    onEndEditing={this._onEndEditing.bind(this)}
                    autoCorrect={false}
                />
                <View>
                    <Text
                        style={styles.tip}
                    >
                    已为您筛选
                    <Text style={{color:'#FA2530'}}>{this.state.count}</Text>
                    条数据
                    </Text>
                </View>
            </View>
            {items}
            {items.length?null:<View style={styles.activity}><ActivityIndicator color='#248BFD' /></View>}
            <View style={{height:40}}></View>
        </ScrollView>
        )
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((data)=>{
            let longlat=data.coords.longitude + ',' +data.coords.latitude;
            AsyncStorage.setItem('pos',longlat);
            let url = Util.searchURL + 'key=' +Util.amapKey +'&keywords=' + this.props.type +'&extensions=base';
            if(_GEO_OPEN){
                url +='&location='+longlat;
                this._doGetData(url);
            }else{
                url +='&location='+_GEO_TEST_POS;
                this._doGetData(url);
            }
        },(error)=>{alert(error)});
    }

    _doGetData(url){
        this;
        console.log(url);
        Util.getJSON(url,(data)=>{
            console.log(data)
            if(data.status&&data.info==='OK'){
                let count = data.pois.length>10?10:data.pois.length;
                this._addStorage(data);
                this.setState({
                    list:data.pois,
                    count:count
                })
            }else{
                alert('没有查询到相应的数据。');
            }
        })
    }

    //加载详情页
    _loadDetail(id,name,location){
        this.props.nav.push({
            component:Detail,
            title:name,
            passProps:{
                id:id
            },
            rightButtonTitle:'导航',
            onRightButtonPress:()=>{
                console.log(this.props.type);
                this.props.nav.push({
                    title:'导航',
                    component:Awebview,
                    passProps:{
                        type:this.props.type,
                        url:'http://localhost:3000/nav?',
                        finish:location,
                    }
                });
            }

        });
    }

    _onChangeText(val){
        this.setState({keywords:val})
    }

    _onEndEditing(){
        let keywords = this.state.keywords;
        let url = Util.searchURL + "key=" + Util.amapKey + "&keywords=" + keywords + "&types=" + this.props.type + "&extensions=base";
        console.log(url);
        this.setState({
            list:null
        });
        AsyncStorage.getItem('pos',(err,result)=>{
            console.log(result);
            if(_GEO_OPEN){
                if(!err){
                    console.log(url);
                    url+='&location='+result;
                    this._doGetData(url);
                }else{
                    alert('定位失败');
                }
            }else{
                url+='&location='+_GEO_TEST_POS;
                this._doGetData(url);
            }
        })
    }

    _addStorage(data){
        let posArr = [];
        let len = data.pois.length>10?10:data.pois.length;
        for(let i=0;i<len;i++){
            posArr.push(data.pois[i].location);
        }
        let posStr = posArr.join(',');
        AsyncStorage.setItem('_'+this.props.type,posStr);
    }

    _call(tel){
        if(tel.length){
            let arr=tel.split(';');
            let BUTTONS=[];
            for(let i in arr){
                BUTTONS.push(arr[i]);
            }
            BUTTONS.push('取消');
            ActionSheetIOS.showActionSheetWithOptions({
                options:BUTTONS,
                cancelButtonIndex:BUTTONS.length - 1
            },(index)=>{arr[index]&&Linking.openURL('tel://'+arr[index])});
        }else{
            alert('没有提供号码');
        }
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ddd'
    },
    input:{
        height:38,
        marginLeft:10,
        marginRight:10,
        borderWidth:Util.pixel,
        paddingLeft:5,
        marginTop:10,
        borderColor:'#868687',
        borderRadius:3,
        fontSize:15
    },
    tip:{
        fontSize:12,
        marginLeft:10,
        marginTop:5,
        color:"#505050"
    },
    row:{
        flexDirection:'row',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        paddingTop:5
    },
    distance:{
        width:120,
        alignItems:'flex-end',
    },
    name:{
        fontSize:15,
        marginBottom:6,
    },
    type:{
        fontSize:12,
        color:'#686868',
    },
    mi:{
        fontSize:12,
        color:'#686868',
    },
    address:{
        fontSize:12,
        marginTop:5,
        color:'#686868',
    },
    phone:{
        marginLeft:10,
        marginRight:10,
        height:30,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:Util.pixel,
        borderColor:'#CCC',
        borderRadius:2,
    },
    searchBg:{
        backgroundColor:'#FFF',
        paddingBottom:10,
    },
    item:{
        marginTop:10,
        backgroundColor:"#FFF",
        paddingBottom:10,
        borderTopWidth:Util.pixel,
        borderBottomWidth:Util.pixel,
        borderColor:'#CCC'
    },
    activity:{
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
    }

})
