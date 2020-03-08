import React, {useState} from 'react'

//class LoginForm extends React.Component {
const LoginForm = () => {

  // Username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {

  event.preventDefault();

    const loginInformation = {

      username: username,
      password: password
    }

    fetch("http://localhost:5000/login", {

      method: "POST",
      headers: { "content-type" : "application/json" },
      body : JSON.stringify(loginInformation)
    })
    .then(res => res.json())
    .then(data => handleLogin(data))
  }

  const handleLogin = (data) => {

    if(data.status == 200){

      sessionStorage.setItem('syntaxSession', data.token);
    }

    else{
      console.log(data);
    }
  }

  return(
    <form onSubmit={onSubmit}>
      <p>Username</p>
      <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>

      <p>Password</p>
      <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>

      <input type="submit" value="Login"/>
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

      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      message: this.state.message
    }

    fetch("http://localhost:5000/register", {

      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(registerInformation)
    })
    .then(res => res.json())
    .then(data => setMessage(data))

  }

  return (
    <form onSubmit={onSubmit}>
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



export { LoginForm, RegisterForm };
