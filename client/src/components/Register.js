import React, { Component } from 'react'
import api from '../api';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Generic input change handler
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // Form submit handler
    async handleSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        const payload = { name: `${firstName} ${lastName}`, email, password };

        try {
            // NOTE: api baseURL is defined in src/api.js; this sends to /auth/register
            const res = await api.post('/auth/register', payload);
            alert(res.data.message || 'Registration successful');
            // Redirect to sign-in page after successful registration
            //YOU COULD ADD EMAIL CONFIRMATION HERE BEFORE REDIRECTING TO SIGN-IN
            window.location.href = '/sign-in';
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || 'Registration failed';
            alert(msg);
        }
    }

    // Render the registration form, think of it as the main function
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>

                <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        )
    }
}