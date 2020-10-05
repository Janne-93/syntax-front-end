import React, {useState} from 'react'
import { Cookies, useCookies } from 'react-cookie';
import './css/Forms.css';

//class LoginForm extends React.Component {
const LoginForm = () => {

  const [cookie, setCookie] = useCookies(["Syntax-Session"]);

  // Username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {

    fetch("http://localhost:5000/api/user/login", {

      method: "POST",
      headers: {"content-type": "application/json"},
      body : JSON.stringify({username: username, password: password})
    })
    .then(res => handleLogin(res))
  }

  const handleLogin = (data) => {

    if(data.status === 200){

      data.json()
        .then(data => data["session-token"])
        .then(cookie => setCookie("Syntax-Session", cookie))      
    }
  }

  return(
    <form onSubmit={onSubmit} className={"authenticationForm"}>

      <div className={"formSection"}>
        <h4>Username</h4>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
      </div>

      <div className={"formSection"}>
        <h4>Password</h4>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

const RegisterForm = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event) => {

    // Prevent from normal form handling redirecting to the api route
    event.preventDefault();

    const registerInformation = {

      username: username,
      password: password,
      email: email,
      message: message
    }

    fetch("http://localhost:5000/api/user/register", {

      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(registerInformation)
    })
    .then(res => res.json())
    .then(data => setMessage(data))

  }

  return (
    <form onSubmit={onSubmit} className={"authenticationForm"}>
      <p>Username</p>
      <input type="text" name="username" value={username} onChange={e => setUserName(e.target.value)} />

      <p>Password</p>
      <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

      <p>Email</p>
      <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />

      <input type="submit" value="Register" />
    </form>
  );
}

const PostCreationForm = () => {

  const [postTitle, setPostTItle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [cookies] = useCookies(["Syntax-Session"]);

  const CreatedPost = {
    
    cookie: cookies["Syntax-Session"],
    title : postTitle,
    content : postContent
  }

  const onSubmit = (event) => {

    event.preventDefault();

    fetch("http://localhost:5000/api/posts/createPost", {

      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(CreatedPost)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return(

    <form onSubmit={onSubmit} className={"postForm"}>
      <div className={"formSection"}>
        <h4>Post title</h4>
        <input type="text" name="postTitle" value={postTitle} onChange={e => setPostTItle(e.target.value)}/>
      </div>
      <div className={"formSection"}>
        <h4>Post content</h4>
        <textarea type="text" name="postContent" value={postContent} onChange={e => setPostContent(e.target.value)}></textarea>
      </div>
      <button type="submit">Post</button>
    </form>
  );
}

export { LoginForm, RegisterForm, PostCreationForm };
