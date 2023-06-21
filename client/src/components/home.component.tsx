import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: { accessToken: "" },
      redirect: "/login"
    });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{currentUser.username}</span>
        </h4>
        <button onClick={this.logOut}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
      
    );
  }
}
