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

          <Post key={post.postID} postTitle={post.postTitle} postContent={post.postContent} postId={post.postID}/>
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

const Post = (props) =>{

  const openPost = () => {

    console.log(props.postID)
  }

  return(
    <div class="Post" onClick={openPost}>
      <h2 class={"PostTitle"}>{props.postTitle}</h2>
      <p class={"PostContent"}>{props.postContent}</p>
    </div>
  );  
};
