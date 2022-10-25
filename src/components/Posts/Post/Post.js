import React, {useState} from "react";
import useStyles from './styles';
import {Card, CardAction, CardContent, CardMedia, Button, Typography, CardActions, ButtonBase} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltIconOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes)

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost =  likes.find((like)=> like===userId)

    const handleLike = async() => {
        dispatch(likePost(post._id)) 

        if(hasLikedPost){
           setLikes(likes.filter((id) => id!==userId)) // unlike post
        }else{
           setLikes([...likes, userId]) // like post
        }
    }

    const Likes  = () => {
        const likeCount = likes.length;

        if(likeCount > 0){
            return hasLikedPost
             ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likeCount>2?`You and ${likeCount-1} others`:`${likeCount} like${likeCount>1?'s':''}`}</>
             ) : (
                <><ThumbUpAltIconOutlined fontSize="small"/>&nbsp;{likeCount} {likeCount===1?'Like':'Likes'}`</> 
             )
        }else return <><ThumbUpAltIconOutlined fontSize="small"/>&nbsp;Like</>
    }

    const openPost = () => history.push(`/posts/${post._id}`)

    return (
        <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
            <CardMedia className ={classes.media} image = {post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title = {post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {((user?.result?.googleId || user?.result._id) === post?.creator) && (
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
            )}

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color = "textSecondary" component ="p">{post.message}</Typography>
            </CardContent>
        </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                   <Likes/>
                </Button> 
                {((user?.result?.googleId || user?.result._id) === post?.creator) && 
                (
                    <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>Delete
                    </Button> 
                )}
            </CardActions>
        </Card>
    )
}

export default Post;