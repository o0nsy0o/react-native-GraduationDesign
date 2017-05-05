import React , {Component} from 'react';

import List from './list';
export default class food extends Component{
    render(){
        return(
            <List type="餐饮" nav={this.props.navigator} />
           );
    }
}