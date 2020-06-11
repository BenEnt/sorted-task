import React, { useReducer } from 'react';

import "./CreatePost.css";

const initialState = {
	title: '',
	body: '',
	author: ''
};

const types = {
	UPDATE: 'update',
	RESET: 'reset'
}

const CreatePost = ({ onCreate }) => {

	const postReducer = (state, { type, ...payload }) => {
		switch (type) {
			case types.UPDATE:
				return { ...state, [payload.key]: payload.value }

			case types.RESET:
				return initialState;

			default:
				return state;
		}
	};

	const [{ title, body, author }, dispatch] = useReducer(postReducer, initialState)

	return (
		<form className="create-post" aria-label="Create post">
			<fieldset>
				<h3>Add new post</h3>
				<ul>
					<li>
						<label htmlFor="title">Title</label>
						<input type="text" id="title" value={title} onChange={({ target: { value } }) => dispatch({ type: 'update', key: 'title', value })} />
					</li>
					<li>
						<label htmlFor="body">Body</label>
						<textarea id="body" value={body} onChange={({ target: { value } }) => dispatch({ type: 'update', key: 'body', value })}></textarea>
					</li>
					<li>
						<label htmlFor="author">Author</label>
						<input type="text" id="author" value={author} onChange={({ target: { value } }) => dispatch({ type: 'update', key: 'author', value })} />
					</li>
				</ul>

				<div>
					<button type="button" onClick={() => {
						onCreate({ title, body, author });
						dispatch({ type: 'reset' })
					}}>Add post</button>
					<button type="button" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
				</div>
			</fieldset>
		</form>
	);
};

export default CreatePost;