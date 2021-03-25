import React from "react"
import Layout from "../components/layout"
import Login from "../components/loginComp"
import { navigate } from "gatsby"
// import Cookies from "react-cookie";

export default class LoginApp extends React.Component {

  // state = {
  //   ...localStorage.getItem('ID') && { ID: localStorage.getItem('ID')}, // Add ID if it excist
  // }

  handleClick = () => {
    console.log(this.state)
  }

  loginHandler = (idInput) => {
    this.setState({
      login: true,
      ID: idInput,
    })
    localStorage.setItem('ID', idInput);
    navigate("/");
  }

  componentDidMount() {
    if (typeof window !== `undefined` && localStorage.getItem('ID')) {
      this.setState({
        ID: localStorage.getItem('ID'),
      })
    }
  }


  render() {
    //const { data } = this.state;
    return (
      <Layout>
        {/* <button onClick={this.handleClick}>Knap</button> */}
        <Login handler={this.loginHandler} />
      </Layout>
    )
  }
}