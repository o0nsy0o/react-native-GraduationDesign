import React , {Component} from 'react';
import List from './list';
export default class film extends Component{
    render(){
        return(
            <List type="电影院" nav={this.props.navigator} />
        );
    }
}