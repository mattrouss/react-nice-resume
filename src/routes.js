import React, { Component } from 'react';
import $ from 'jquery';
import Home from './Components/Home';
import ProjectDetail from './Components/ProjectDetail';
import NoMatch from './Components/NoMatch';
import { Route, Switch } from 'react-router-dom';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumeData: {}
        };
    }

    getResumeData() {
        $.ajax({
            url: '/resumeData.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ resumeData: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
                alert(err);
            }
        });
    }

    componentDidMount() {
        this.getResumeData();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/project/:id" render={(props) => <ProjectDetail {...props} data={this.state.resumeData} />} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default Routes;