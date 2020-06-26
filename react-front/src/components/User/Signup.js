import React, { Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      error: "",
    };
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, passwordConfirm } = this.state;
    const user = {
      name,
      email,
      password,
      passwordConfirm,
    };
    this.signup(user).then((data) => {
        console.log(data.error)
        this.setState({ error: data.error });
    //   else 
    //     this.setState({
    //       name: "",
    //       email: "",
    //       password: "",
    //       passwordConfirm: "",
    //       error: "",
    //     });

    });
  };

  signup = (user) => {
    return fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json;
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password Confirm</label>
            <input
              onChange={this.handleChange("passwordConfirm")}
              type="password"
              className="form-control"
              value={this.state.passwordConfirm}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
