import React , {Component} from 'react';
import List from './list';
export default class bank extends Component{
    render(){
        return(
            <List type="银行" nav={this.props.navigator} />
        );
    }
}