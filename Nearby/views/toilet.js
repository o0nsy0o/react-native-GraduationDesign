import React , {Component} from 'react';
import List from './list';
export default class Toilet extends Component{
    render(){
        return(
            <List type="卫生间" nav={this.props.navigator} />
        );
    }
}