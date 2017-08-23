import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    NavigatorIOS,
    StatusBarIOS,
    TabBarIOS,
} from 'react-native';
import React , {Component} from 'react';
import Bank from './views/bank';//一般来说引入的组件使用驼峰命名法来给予区别。
import Food from './views/food';
import Toilet from './views/toilet';
import Film from './views/film';
import Awebview from './views/Awebview';
import foodimg from '../img/food.png';
import filmimg from '../img/film.png';
import toiletimg from '../img/toilet.png';
import bankimg from '../img/bank.png';


_GEO_OPEN = true;//是否开始真实定位，true为开启，false启用模拟坐标。
_GEO_TEST_POS = '121,390686,31.213976';

//  高亮
StatusBarIOS.setStyle('light-content');
StatusBarIOS.setNetworkActivityIndicatorVisible(true);

// var Nearby = React.createClass();//这是es5的写法

export default class Nearby extends Component{
    constructor(){
        super();
        this.state = {
            selected:'美食'
        }
    }
    render(){
        return (
            <View style = {styles.container}>
                <TabBarIOS>
                    <TabBarIOS.Item
                        title="美食"
                        selected = {this.state.selected ==="美食"}//当状态对象里的selected全等为selected的时候，这个item是被选中的。
                        icon = {foodimg}//icon是一个图标，这个导航的图标。
                        onPress = {()=>{this.setState({selected:"美食"})}}//这里设置一个监听事件，监听当这个item在屏幕上背按压时，改变这个组件的状态对象的selected属性的值。
                    >
                    <NavigatorIOS
                        barTintColor='#007AFF'//设置这个导航的背景颜色。
                        titleTextColor='#FFF'//设置这个导航的字体颜色。
                        tintColor='#FFF'//导航上按钮的颜色设置
                        ref='nav_food'//代表这个组件自己
                        style={styles.container}
                        initialRoute={{
                            component:Food,
                            title:'美食',
                            rightButtonTitle:'地图',
                            onRightButtonPress:()=>{
                                this.refs.nav_food.navigator.push({
                                    title:'地图',
                                    component:Awebview,
                                    passProps:{
                                        url:'http://localhost:3000/map?',
                                        type:'餐饮'
                                    }
                                });
                            }
                        }}
                    />
                    </TabBarIOS.Item>
                    

                    <TabBarIOS.Item 
                        title="电影"
                        selected = {this.state.selected ==="电影"}//当状态对象里的selected全等为selected的时候，这个item是被选中的。
                        icon = {filmimg}//icon是一个图标，这个导航的图标。
                        onPress = {()=>{this.setState({selected:"电影"})}}//这里设置一个监听事件，监听当这个item在屏幕上背按压时，改变这个组件的状态对象的selected属性的值。
                    >
                        <NavigatorIOS
                            barTintColor='#007AFF'//设置这个导航的背景颜色。
                            titleTextColor='#FFF'//设置这个导航的字体颜色。
                            tintColor='#FFF'//导航上按钮的颜色设置
                            ref='nav_film'
                            style={styles.container}
                            initialRoute={{
                                component:Film,
                                title:'电影',
                                rightButtonTitle:'地图',
                                onRightButtonPress:()=>{
                                    this.refs.nav_film.navigator.push({
                                        title:'地图',
                                        component:Awebview,
                                        passProps:{
                                            url:'http://localhost:3000/map?',
                                            type:'电影院'
                                        }
                                    });
                                }
                            }}
                        />
                    </TabBarIOS.Item>


                    <TabBarIOS.Item 
                        title="银行"
                        selected = {this.state.selected ==="银行"}//当状态对象里的selected全等为selected的时候，这个item是被选中的。
                        icon = {bankimg}//icon是一个图标，这个导航的图标。
                        onPress = {()=>{this.setState({selected:"银行"})}}//这里设置一个监听事件，监听当这个item在屏幕上背按压时，改变这个组件的状态对象的selected属性的值。
                    >
                        <NavigatorIOS
                            barTintColor='#007AFF'//设置这个导航的背景颜色。
                            titleTextColor='#FFF'//设置这个导航的字体颜色。
                            tintColor='#FFF'//导航上按钮的颜色设置
                            ref='nav_bank'
                            style={styles.container}
                            initialRoute={{
                                component:Bank,
                                title:'银行',
                                rightButtonTitle:'地图',
                                onRightButtonPress:()=>{
                                    this.refs.nav_bank.navigator.push({
                                        title:'地图',
                                        component:Awebview,
                                        passProps:{
                                            url:'http://localhost:3000/map?',
                                            type:'银行'
                                        }
                                    });
                                }
                            }}
                        />
                    </TabBarIOS.Item>


                    <TabBarIOS.Item 
                        title="卫生间"
                        selected = {this.state.selected ==="卫生间"}//当状态对象里的selected全等为selected的时候，这个item是被选中的。
                        icon = {toiletimg}//icon是一个图标，这个导航的图标。
                        onPress = {()=>{this.setState({selected:"卫生间"})}}//这里设置一个监听事件，监听当这个item在屏幕上背按压时，改变这个组件的状态对象的selected属性的值。
                    >
                        <NavigatorIOS
                            barTintColor='#007AFF'//设置这个导航的背景颜色。
                            titleTextColor='#FFF'//设置这个导航的字体颜色。
                            tintColor='#FFF'//导航上按钮的颜色设置
                            ref='nav_toilet'
                            style={styles.container}
                            initialRoute={{
                                component:Toilet,
                                title:'卫生间',
                                rightButtonTitle:'地图',
                                onRightButtonPress:()=>{
                                    this.refs.nav_toilet.navigator.push({
                                        title:'地图',
                                        component:Awebview,
                                        passProps:{
                                            url:'http://localhost:3000/map?',
                                            type:'卫生间'
                                        }
                                    });
                                }
                            }}
                        />
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        )
    }
}

const styles = StyleSheet.create({//根据你的需要选择const和let声明量。
    container:{
        flex:1
    }
})
