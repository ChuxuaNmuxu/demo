import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import * as api from '../../../action/fetchTestData';
import {fetchData} from '../../../api/action';
import * as actionTypes from '../../../actionType'

class FetchData extends Component {
    constructor(props, context) {super(props, context);
        
        this.handleClick = this.handleClick.bind(this);
    }
    

    async handleClick () {
        const {dispatch} = this.props;
        await dispatch(fetchData({
            url: '/api/test',
            actionType: actionTypes.FETCH_SUCCESS
        }))

        await dispatch(fetchData({
            url: 'https://dev-cjcms-api.ecaicn.com/api/user/coursewares?page=1&pageSize=10&folderId=0&keyword=',
            actionType: actionTypes.FETCH_SUCCESS
        }))

        const data = fetch('https://segmentfault.com/api/promote/ad/1190000008394749?_=0deb961a009479420b0667013fbde2fa')
        .then(response => response.text())
        .then(data => console.log('data: ', data))

        // const response = await fetch('/api/test');
        // const data = await response.text();
        // console.log(data);
        // this.setState({
        //     data: JSON.parse(data).result
        // })
    }

    render() {
        const {
            dataState: {
                fetchData,
                error,
                loading
            }
        } = this.props;

        console.log('this.props: ', this.props.dataState)

        return (
            <div>
                <button onClick={this.handleClick} >fetch data</button>
            </div>
        );
    }
}

FetchData.propTypes = {

};

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchData: data => {
//             dispatch(api.fetchTestData(data))
//         }
//     }
// }

const mapStateToProps = state => {
    console.log('state： ', state)
    const {dataReducers: dataState} = state;
    return {
        dataState
    }
}

export default connect(mapStateToProps)(FetchData);