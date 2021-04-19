import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Avatar, TextField, Button, Divider,
} from '@material-ui/core';
import LoadingView from '../../components/LoadingView';
import { useUser } from '../../UserContext';
import { createComment, getCommentsForDocument } from '../../services';
import Comment from './Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  commentInputContainer: {
    marginTop: theme.spacing(3),
  },
  commentInput: {
    width: '100%',
    borderColor: '#CCC',
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'right',
    marginTop: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  commentsList: {

  },
}));

function Comments({ docId }) {
  const classes = useStyles();
  const { user } = useUser();
  const [comments, setComments] = useState(null);
  const [commentContent, setCommentContent] = useState('');

  const refreshComments = React.useCallback(async () => {
    setComments(await getCommentsForDocument(docId));
  }, [docId]);

  useEffect(() => {
    (async () => {
      await refreshComments();
    })();
  }, [refreshComments]);

  const getPictureURL = () => {
    if (user && user.pictureURL) {
      return user.pictureURL;
    }
    return '';
  };

  const getComments = () => {
    if (comments && comments.length > 0) {
      return (
        <>
          { comments.map((comment) => <Comment comment={comment} key={comment.SK} />)}
        </>
      );
    }
    return (
      <Typography variant="body2">
        No comments yet. You can start the discussion.
      </Typography>
    );
  };

  const addComment = async () => {
    try {
      await createComment(docId, commentContent);
    } catch (err) {
      // Error handling
    }
    setCommentContent('');
    await refreshComments();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Comments
      </Typography>
      <Grid container className={classes.commentInputContainer}>
        <Grid item xs={1}>
          <Avatar className={classes.small} src={getPictureURL()} />
        </Grid>
        <Grid item xs={11}>
          <TextField
            variant="filled"
            placeholder="Add a comment...."
            className={classes.commentInput}
            multiline
            rows={2}
            rowsMax={4}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </Grid>
      </Grid>
      <div className={classes.buttonContainer}>
        <Button
          onClick={addComment}
          variant="outlined"
          color="primary"
          className={classes.submitButton}
          disabled={commentContent.length < 1}
        >
          Add Comment
        </Button>
      </div>
      { !comments
      && <LoadingView size={20} />}
      { comments
        && (
        <div className={classes.commentsList}>
          <Divider className={classes.divider} />
          { getComments() }
        </div>
        )}
    </div>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
};

export default Comments;
