import React, { Component } from 'react';

class ImageWithSubtext extends Component {
    render() {
        return (<div>
            <img className="project-image" src={this.props.src} alt={this.props.alt}></img>
            <div className='image-subtext'>{this.props.subtext}</div>
        </div>);
    }
}

export default ImageWithSubtext;