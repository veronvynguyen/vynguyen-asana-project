import React, {Component} from 'react'
import Photo from '../Gallery/Photo'

class Single extends Component {
    render() {
        const {match, posts} = this.props
        const id = Number(match.params.id)
        const post = posts.find((post) => post.id === id)
        const index = this.props.posts.findIndex((post) => post.id === id)
        if (this.props.loading === true) {
            return <div className="loader"> ...loading </div>
        } else if (post) {
            return <div className='single-photo'>
                    <Photo post={post} {...this.props} index={index}/>
                    <h3>{post.name}</h3>
                    
                </div>
        } else {
            return <h1> ...no post found </h1>
        }
    }
}

export default Single