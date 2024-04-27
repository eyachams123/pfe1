import React, { useState } from 'react';
import './CommentSection.css'; // Import your CSS file
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Edit, Delete, Save, Send } from '@mui/icons-material'; // Import the necessary icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Comment = () => {
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [editingCommentId, setEditingCommentId] = useState(null); // New state to track the id of the comment being edited
    const [likedComments, setLikedComments] = useState([]);

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    }

    const handleLike = (id) => {
        if (likedComments.includes(id)) {
            setLikedComments(likedComments.filter(likedId => likedId !== id));
        } else {
            setLikedComments([...likedComments, id]);
        }
    }

    const isLiked = (id) => {
        return likedComments.includes(id);
    }
    
    const addPost = () => {
        if (!userComment) return;

        const newComment = {
            id: comments.length,
            name: "User",
            message: userComment,
            image: require('./user1.png'),
            date: new Date().toLocaleString()
        };

        setComments([...comments, newComment]);
        setUserComment('');
        setCommentCount(comments.length + 1);
    }

    const handleEdit = (id) => {
        // Set the comment to be edited in the input field
        const commentToEdit = comments.find(comment => comment.id === id);
        setUserComment(commentToEdit.message); // Update userComment state
        setEditingCommentId(id);
    }

    const handleSaveEdit = () => {
        // Save the edited comment
        const updatedComments = comments.map(comment => {
            if (comment.id === editingCommentId) {
                return {
                    ...comment,
                    message: userComment
                };
            }
            return comment;
        });
        setComments(updatedComments);
        setUserComment('');
        setEditingCommentId(null);
    }

    const handleDelete = (id) => {
        // Implement delete functionality
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        setCommentCount(updatedComments.length);
    }

    return (
        <div className='commentsection'>
            <div className="container">
                <div style={{ color: '#808080' }}><span id="comment">{commentCount}</span> Comments</div>
                <div className="comments">
                    {comments.map(comment => (
                        <div key={comment.id} className="parents">
                            <img src={comment.image} alt="User" />
                            <div>
                                <h1  style={{ color: 'black' }}>{comment.name}</h1>
                                {editingCommentId === comment.id ? (
                                    <TextField
                                        value={userComment}
                                        onChange={handleCommentChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleSaveEdit}>
                                                        <Save />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        
                                    />
                                ) : (
                                    <p>{comment.message}</p>
                                )}
                                <div className="engagements">
                                    {isLiked(comment.id) ? (
                                        <FavoriteIcon onClick={() => handleLike(comment.id)} />
                                    ) : (
                                        <FavoriteBorderIcon onClick={() => handleLike(comment.id)}/>
                                    )}
                                    {editingCommentId === comment.id ? (
                                        <IconButton>
                                            <Edit />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(comment.id)}>
                                            <Edit />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(comment.id)}>
                                        <Delete />
                                    </IconButton>
                                </div>
                                <span className="date">{comment.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="commentbox">
                    <img src={require('./user1.png')} alt="User" />
                    <div className="content">
                        <div className="commentinput">
                            <TextField
                                type="text"
                                placeholder="Enter comment"
                                className="usercomment"
                                value={userComment}
                                onChange={handleCommentChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={addPost}>
                                                <Send />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
