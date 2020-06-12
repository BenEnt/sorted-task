import React from 'react';

// JSON contains <br/>'s...

const Post = ({ title = '', body = '', author = '', onDelete = () => { } }) => (
	<div className="postView">
		<div className="postView-header">
			<h2>{title}</h2>
		</div>

		<div className="postView-body">
			<p>{body.replace(/<br\s*[\/]?>/gi, "\n")}</p>
			<p className="postView-author">Posted by: {author}</p>
		</div>

		<div className="postView-footer">
			<button className="button button-delete" onClick={onDelete}>Delete</button>
		</div>
	</div>
)

export default Post;