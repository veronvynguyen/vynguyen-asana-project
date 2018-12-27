import {database} from '../database/config'

export function startAddingPost(post) {
    return (dispatch) => {
        return database.ref('posts').update({[post.id]: post}).then(() => {
            dispatch(addPost(post))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function startLoadingPost() {
    return (dispatch) => {
        return database.ref('posts').once('value').then((snapshot) => {
            let posts = []
            snapshot.forEach((childSnapshot) => {
                posts.push(childSnapshot.val())
            })
            dispatch(loadPosts(posts))
        }).catch((error) => {
            console.log(error)
        });
    }
}

export function startAddingComment(comment, postId) {
    return (dispatch) => {
        return database.ref('comments/'+postId).push(comment).then(() => {
            dispatch(addComment(comment, postId))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function startRemovingPost(index, id) {
    return (dispatch) => {
        return database.ref(`posts/${id}`).remove().then(() => {
            dispatch(removePost(index))
        })
    }
}

export function removePost(index) {
    return {
        type: 'REMOVE_POST',
        index
    }
}

export function addPost(post) {
    return {
        type: 'ADD_POST',
        post
    }
}

export function addComment(comment, postId) {
    return {
        type: 'ADD_COMMENT',
        comment,
        postId
    }
}

export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts
    }
}