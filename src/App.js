import React, {useState} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { LoginForm, RegisterForm } from './Forms';
import Posts from './Posts';

const App = () => {

  const [user, setUser] = useState(null);

  fetch("http://localhost:5000/posts", {

    method: "POST",
    headers: { "Authorization" : "Bearer " + sessionStorage.getItem("syntaxSession")}
  })
  .then(res => {

    console.log(res.status);
    if(res.status !== 200) {

      sessionStorage.removeItem("syntaxSession");
    }
  })

  return (
    <>
    
    <BrowserRouter>
      <Route path="/" component={Posts} exact/>
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
    </BrowserRouter>
    </>
  );
}


export default App;
