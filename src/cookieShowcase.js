import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import './App.css';

class CookieShowcase extends React.Component {
    constructor() {
        super();
        this.state = {siteVisitCount: 0, apiCallCount: 0};
    }

    componentDidMount() {
        this.countSiteVisitByFrontendCookie();
        this.countAPICallByBackendCookie();

    }

    render() {
        return (
            <div>
                <div className="App">you visit this site {this.state.siteVisitCount} times</div>
                <div className="App">you call api {this.state.apiCallCount} times</div>
            </div>
        )
    }

    countSiteVisitByFrontendCookie() {
        let siteVisitCount = Cookie.get('siteVisitCount');
        if (siteVisitCount) {
            siteVisitCount++;
        } else {
            siteVisitCount = 1;
        }
        Cookie.set('siteVisitCount', siteVisitCount);
        this.setState({siteVisitCount});
    }
    
    countAPICallByBackendCookie() {
        axios.get('/api/health').then(response=>{
            console.log(response);
        }).catch(error=> {
            console.log(error);
        }).finally(() => {
            const apiCallCount = Cookie.get('apiCallCount') || 0;
            this.setState({apiCallCount});
        });
    }
}

export default CookieShowcase;
