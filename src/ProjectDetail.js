import React, { Component } from 'react';
import NoMatch from './Components/NoMatch';

class ProjectDetail extends Component {
    render() {
        var id = this.props.match.params.id;
        if (Object.keys(this.props.data).length !== 0) {
            var project = this.props.data.projects.find(elem => elem.route === id);
            var title = this.props.data.title;
            var subtitle = this.props.data.category;
            var description = this.props.data.description;
        }

        if (project) {
            return (
                <React.Fragment>
                    <header id={title}>
                        <nav id="nav-wrap">
                            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                            <ul id="nav" className="nav">
                                <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                                <li><a className="smoothscroll" href="#about">About</a></li>
                                <li><a className="smoothscroll" href="#resume">Resume</a></li>
                                <li><a className="smoothscroll" href="#portfolio">Works</a></li>
                                <li><a className="smoothscroll" href="#contact">Contact</a></li>
                            </ul>
                        </nav>

                        <div className="row banner">

                            <div className="banner-text">
                                <h1 className="responsive-headline">{title}</h1>
                                <h3>{subtitle}.</h3>
                                <hr />
                            </div>
                        </div>

                        <p className="scrolldown">
                            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
                        </p>

                    </header>
                    {description}
                </React.Fragment>
            );
        }
        return <NoMatch />
            
    }
}

export default ProjectDetail;
