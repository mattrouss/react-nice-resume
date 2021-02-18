import React, { Component } from 'react';
import $ from 'jquery';
import Home from './Components/Home';
import ProjectDetail from './Components/ProjectDetail';
import NoMatch from './Components/NoMatch';
import { Route, Switch } from 'react-router-dom';
import loadjs from 'loadjs';

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

    componentWillMount() {
        loadjs('/js/jquery-migrate-1.2.1.min.js', function () {
            loadjs('/js/jquery-1.10.2.min.js', function () {
                loadjs('/js/jquery.flexslider.js', function () {
                    loadjs('/js/waypoints.js', function () {
                        loadjs('/js/jquery.fittext.js', function () {
                            loadjs('/js/magnific-popup.js', function () {
                                loadjs('/js/init.js');
                            });
                        });
                    });
                });
            });
        });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/project/:id" render={(props) => <ProjectDetail {...props} data={this.state.projectData} />} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default Routes;