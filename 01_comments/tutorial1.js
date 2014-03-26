/** @jsx React.DOM */

var converter = new Showdown.converter();

var myData = [
  {author: "Pete Hunt", text: "This is one comment"},
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
    //    <Comment author="Jordan Walke">This is *another* comment</Comment>

    // alternatively, we can pass in a data object, then map it
    var commentNodes = this.props.data.map(function(commentData) {
      return (
        <Comment author={commentData.author}>{commentData.text}</Comment>
      );
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function() {
    // this.refs exposes the elements that have a ref attribute
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();

    // pass information back up to the parent (via props)
    // the object is 'comment' on CommentBox.handleCommentSubmit
    this.props.onCommentSubmit({author: author, text: text});

    // Clear the form upon submission
    this.refs.author.getDOMNode().value = "";
    this.refs.text.getDOMNode().value = "";

    // return false to prevent browser default action
    return false;
  },
  render: function() {
    // ref attribute provides the field name the data is bound to in this.refs
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author"/>
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// Create a react component, CommentBox
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    })
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    //why className and not class?
    // not DOM nodes, but instantiation of React `div` components
    return (
      <div className="commentBox">        
        Hello world! I am a CommentBox.
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
    //onCommentSubmit?? we invoke it form CommentForm when we handleSubmit
    // also, cant put comments in that return!
  }
});


// define stuff, such as pollInterval on the owner. Ownee accesses these attributes via this.props.pollInterval
React.renderComponent(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
