import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import React,{Component} from 'react';
import {Util} from './util';

export default class detail extends Component{
    constructor(){
        super();
        this.state = {
            data:null,
            photos:null,
        };
    }
    render(){
        let imageArr=[];
        if(this.state.photos){
            this.state.photos;
            for(let i in this.state.photos){
                imageArr.push(
                    <Image
                        key={i}
                        style={styles.image}
                        source={{uri: this.state.photos[i].url}}
                    />
                )
            }
        }

        return(
            <ScrollView>
                {this.state.data?
                <View style={styles.content}>
                    <Text style={styles.name}>{this.state.data.name}</Text>
                    <Text style={styles.types}>类型：{this.state.data.type}</Text>
                    <Text style={styles.address}>地址：{this.state.data.address}</Text>
                    <Text style={styles.tag}>标签：{this.state.data.tag}</Text>
                    <Text style={styles.server}>照片：{imageArr}</Text>
                </View>
                :null}
            </ScrollView>
        )
    }

    componentDidMount(){
        let url = Util.detailURL + 'key=' + Util.amapKey +'&id=' +this.props.id + '&extensions=all';
        Util.getJSON(url,(data)=>{
            console.log(data);
            if(data.status&& data.info ==='OK' && data.pois.length){
                let obj = data.pois[0];
                let photosNum = obj.photos.length>10?10:obj.photos.length;
                let photosArr=[];
                for(var i=0;i<photosNum;i++){
                    photosArr.push(obj.photos[i]);
                }
                if(obj.deep_info&&obj.deep_info.tag){
                    obj.server=obj.deep_info.tag
                }
                this.setState({
                    data:obj,
                    photos:photosArr
                })
                console.log(this.state.data)
            }else{
                    alert('数据服务出错');
                }
        })
       
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1
    },
    name:{
        fontSize:15,
        color:'#1D92F5',
        fontWeight:'bold',
    },
    content:{
        marginTop:10,
        marginRight:10,
        marginLeft:10,
    },
    tag:{
        fontSize:13,
        marginTop:10,
    },
    types:{
        marginTop:10,
        fontSize:13,
        color:'#4C4C4C',
    },
    address:{
        fontSize:13,
        color:'#4C4C4C',   
    },
    server:{
        flex:1,
        alignItems:'flex-start',
        marginTop:10,
        fontSize:13,
    },
    image:{
        width:100,
        height:100,
    }
})