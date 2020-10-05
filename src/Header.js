import React, {useState, Component} from 'react';
import './css/Header.css';

class Header extends Component
{
    constructor(props){

        super(props);
        this.state = {
            cookie: this.props.cookie["Syntax-Session"],
            userName: null,
            header: <LoggedOutHeader/>,
            removeCookie: this.props.cookieRemover
        };
    }

    componentDidMount(){

        fetch("http://localhost:5000/api/user/validateSession", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"cookie" : this.state.cookie})
        })
        .then(res => this.handleResponse(res))
    }

    handleResponse = (data) => {

        // If server application says the cookie is valid
        // - Set the state variable "username"
        // - Set the header to <LoggedInHeader/>.
        if(data.status === 200){

          data.json()
            .then(data => this.setState({userName: data.ID}))
            .then(() => this.setState({
                
              header: <LoggedInHeader username={this.state.userName} cookieRemover={this.state.removeCookie}/>
            }))
        }

        // If server did not accept the cookie, remove it.
        else if(data.status === 404){
            
            this.state.removeCookie("Syntax-Session");
        }
    }

    render(){

        return(

            this.state.header
        );
    }
}
export default Header;

const LoggedInHeader = (props) => {

    const logout = () => {

        props.cookieRemover("Syntax-Session");
    }

    const greetingText = [
        "Logged in as: " + props.username, 
        "Greetings, " + props.username, 
        "How's it going, " + props.username + "?",
        "What's on your mind, " + props.username + "?"
    ];    

    return(
        <div className={"header"}>
            <section id="leftSideWidgets" className={"headerWidgets"}>
                <div className={"headerItem"}><h5 id="loggedInAs">{ greetingText[Math.floor(Math.random() * greetingText.length)]}</h5></div>
            </section>            
            <section id="rightSideWidgets" className={"headerWidgets"}> 
                <div className={"headerItem"}><a href="/">Main</a></div>
                <div className={"headerItem"}><a href="/newpost">Create a post</a></div>
                <div className={"headerItem"}><a href="/" onClick={logout}>Logout</a></div>
            </section>
        </div>
    );
}

const LoggedOutHeader = () => {

    return(
        <div className={"header"}>
            <section id="leftSideWidgets" className={"headerWidgets"}>

            </section>
            <section id="rightSideWidgets" className={"headerWidgets"}>
                <div className={"headerItem"}><a href="/">Main</a></div>
                <label className={"headerItem"}><a href="/login">Login</a></label>
                <label className={"headerItem"}><a href="/register">Register</a></label>
            </section>
        </div>
    );
}
