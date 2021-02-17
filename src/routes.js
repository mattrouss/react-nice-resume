import React, { Component } from 'react';
import $ from 'jquery';
import Home from './Components/Home';
import ProjectDetail from './Components/ProjectDetail';
import NoMatch from './Components/NoMatch';
import { Route, Switch, Redirect } from 'react-router-dom';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectData: {}
        };
    }

    getProjectData() {
        $.ajax({
            url: '/projectData.json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ projectData: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
                alert(err);
            }
        });
    }

    componentDidMount() {
        this.getProjectData();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/project/:id" render={(props) => <ProjectDetail {...props} data={this.state.projectData}/>} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default Routes;