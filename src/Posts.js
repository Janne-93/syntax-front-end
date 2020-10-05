import React, {useState, Component} from 'react';
import'./css/Posts.css';

class Posts extends Component
{
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      postsItems: null
    };
  }

  componentDidMount(){

    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(res => res.json())
    .then(data => this.setState({posts : data}))
    .then(() => this.FillPostsItems())
  }

  FillPostsItems = () => {

    if(this.state.posts.length > 0){

      this.setState({postsItems: this.state.posts.map(post => (

          <Post key={post.postID} postTitle={post.postTitle} postContent={post.postContent}/>
        ))
      });
    }
  }

  render(){

    return(
      <>
        <div>{this.state.postsItems}</div>
      </>
    );
  }
} export default Posts;

class Post extends Component{

  render(){

    return(
      <div class="Post">
        <h2 class={"PostTitle"}>{this.props.postTitle}</h2>
        <p class={"PostContent"}>{this.props.postContent}</p>
      </div>
    );
  }
};
