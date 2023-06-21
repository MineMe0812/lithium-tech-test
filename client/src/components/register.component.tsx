import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

type Props = {};

type State = {
  username: string,
  email: string,
  password: string,
  successful: boolean,
  redirect: string | null,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      redirect: null,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { username: string; email: string; password: string }) {
    const { username, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      username,
      email,
      password
    ).then(
      response => {
        // this.setState({
        //   message: response.data.message,
        //   successful: true
        // });

        toast.success('Success Register', {
          position: "bottom-left",
        });
        this.setState({ redirect: "/login" });

      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // this.setState({
        //   successful: false,
        //   message: resMessage
        // });
        toast.error(resMessage, {
          position: "bottom-left",
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    return (
      <>
        <div className="form_container">
        <h2>Signup Account</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
          <Form>
          <div>
            <label htmlFor="email">Username</label>
            <Field name="username" type="text" placeholder="Enter your username" className="form-control" />
            <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" placeholder="Enter your email" className="form-control" />
            <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
                 <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
              />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </Form>
        </Formik>
       
        </div>
        <ToastContainer />
      </>

    
    );
  }
}
