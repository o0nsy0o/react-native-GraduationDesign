import React,{Component} from 'react';
import {
    ScrollView,
    WebView,
    View,
    Text,
    AsyncStorage,
} from 'react-native';

export default class Awebview extends Component{
    constructor(){
        super()
        this.state = {
            url:null
        }
    }
    render(){
        let webview =null;
        if(this.state.url){
            webview = <View style={{flex:1}}><WebView source={{uri:this.state.url}}/></View>
        }
        return(
            <View style = {{flex:1}}>
                {webview}
            </View>
        )
    }
    componentDidMount(){
        console.log(1);
        let pos = null;
        let markers = null;
        let url = null;
        AsyncStorage.multiGet(['_'+this.props.type,'pos'],(err,result)=>{
            if(!err){
                let pos = result[1][1];
                let markers = result[0][1];
                let url = this.props.url;
                if(url=="http://localhost:3000/map?"){
                    if(_GEO_OPEN){
                        url +='pos='+pos+'&markers='+markers;
                        console.log(url);
                    }else{
                        url +='pos='+_GEO_TEST_POS+'&markers='+markers;
                    }                
                    this.setState({
                        url:url
                    })
                }else if(url=='http://localhost:3000/nav?'){
                    if(_GEO_OPEN){
                        url +='start='+pos+'&finish='+this.props.finish;
                        console.log(url);
                    }else{
                        url +='start='+_GEO_TEST_POS+'&finish='+this.porp.finish;
                    }                
                    this.setState({
                        url:url
                    })
                }else{
                    alert('网址有问题！！！');
                }
            }else{
                alert('storage有问题！！！');
            }
        })
        

    }
}

