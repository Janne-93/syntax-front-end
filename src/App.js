import React, {useState} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { LoginForm, RegisterForm, PostCreationForm } from './Forms';
import Posts from './Posts';
import Header from './Header';
import { Cookies, useCookies } from 'react-cookie';

const App = () => {
  
  const [cookies, removeCookie] = useCookies(["Syntax-Session"]);

  return (
    <>
    <Header cookie={cookies} cookieRemover={removeCookie}/>
    <BrowserRouter>
      <Route path="/" component={Posts} exact/>
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/newpost" component={PostCreationForm} />
    </BrowserRouter>
    </>
  );
}
export default App;
