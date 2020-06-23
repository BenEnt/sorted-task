import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

import "../../styles/buttons.css"

const isEmpty = (obj) => !Object.values(obj).some(x => (x !== null && x !== ''));
const removeItemFromArray = (arr, id) => arr.filter(item => item.id !== id);
const Message = ({ className, children }) => <div className={className}>{children}</div>

const Lister = ({ searchTerm = '' }) => {
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);


	const handleSearchTerm = (data) => {

		let dataCloned = [...data];
		const searchTermToLower = searchTerm.toLowerCase().replace(/\s/g, '');

		if (searchTermToLower.length > 3) {
			dataCloned = dataCloned.filter(post => {
				const postTitle = post.title.toLowerCase().replace(/\s/g, '');

				return postTitle.indexOf(searchTermToLower) > -1
			})
		}

		setPosts(dataCloned);
	}


	useEffect(() => {
		getPosts()
			.then(data => {
				setLoading(false);
				handleSearchTerm(data);
			})
			.catch(err => {
				setHasError(true);
				setLoading(false);
				console.log(err);
			});
	}, [searchTerm, handleSearchTerm]);


	const onDeletePost = (id) => {
		const _posts = removeItemFromArray(allPosts, id)
		setPosts(_posts)
	}

	const onCreatePost = (post) => {
		if (isEmpty(post)) {
			return false;
		}

		post.id = allPosts.length + 1;
		setPosts(posts => [...posts, post]);
	}


	const Posts = ({ allPosts }) => {

		if (loading) {
			return <Message className="loading">Loading...</Message>
		}

		if (!allPosts.length || hasError) {
			return <Message className="no-results">No posts available...</Message>
		}

		return (
			<div className="postList">
				{allPosts.map((postData) => {
					return <Post
						key={postData.id}
						{...postData}
						onDelete={() => { onDeletePost(postData.id) }}
					></Post>
				})}
			</div >
		)
	}

	return (
		<>
			<Posts allPosts={allPosts}></Posts>
			<CreatePost onCreate={onCreatePost} />
		</>
	);

};

export default Lister;