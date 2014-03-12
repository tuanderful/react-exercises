/** @jsx React.DOM */

var converter = new Showdown.converter();

var data = [
  {author: "Pete Hunt"}, text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    //careful when using dangerouselySetInnerHTML
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    )
  }
})

var CommentList = React.createClass({
  render: function() {
    // attributes passed into the Comment component are accessible via {this.props.attrName}
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a commentForm.
      </div>
    );
  }
});

// Create a react component, CommentBox
var CommentBox = React.createClass({
  render: function() {
    //why className and not class?
    // not DOM nodes, but instantiation of React `div` components
    return (
      <div className="commentBox">        
        Hello world! I am a CommentBox.
        <CommentList />
        <CommentForm />
      </div>
    );
    // also, cant put comments in that return!
  }
});


// 
React.renderComponent(
  <CommentBox />,
  document.getElementById('content')
);