import React, { Component } from 'react';

class DefaultArticle extends Component {
  render() {
    return (
      <div>
        <h2 className="title">
            Title
        </h2>
        <p className="paragraph">
            This is a paragraph.
        </p>
        <p className="paragraph">
            This is a paragraph.
        </p>
        <h2 className="title">
            Second title
        </h2>
        <p className="paragraph">
            This is a paragraph.
        </p>
      </div>
    );
  }
}

export default DefaultArticle;
