import React, { Component } from 'react';
import NoMatch from './NoMatch';
import Footer from './Footer';

class ProjectDetail extends Component {
    render() {
        var id = this.props.match.params.id;
        if (Object.keys(this.props.data).length !== 0) {
            var project = this.props.data.projects.find(elem => elem.route === id);
            var title = project.title;
            var subtitle = project.category;
            var description = project.description;

            var projectNav = this.props.data.projects.map(function(project) {
                var nav = <a href={"/project/" + project.route}>{project.title}</a>;
                if (project.route === id) {
                    return <li key={project.route} className="current">{nav}</li>
                }
                else {
                    return <li key={project.route}>{nav}</li>
                }
            });
        }

        if (project) {
            return (
                <div>
                    <header id="#home" className="project-bg" style={{ backgroundImage: "url(/images/portfolio/" + project.banner + ")",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                }}>
                        <nav id="nav-wrap">
                            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

                            <ul id="nav" className="nav">
                                <li><a href="/">Home</a></li>
                                {projectNav}
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
                            <a className="smoothscroll" href="#description"><i className="icon-down-circle"></i></a>
                        </p>

                    </header>
                    <section id="description" className='project-description'>
                        {description}
                    </section>
                    <Footer />
                </div>
            );
        }
        return <NoMatch />
            
    }
}

export default ProjectDetail;
