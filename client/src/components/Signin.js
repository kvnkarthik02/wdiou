/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import api from '../api';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectTo: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const {name , value} = e.target;
        this.setState({[name]: value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const {email , password} = this.state;
        const payload = {email: email, password};

        try{
            const res = await api.post('/auth/signin', payload);
            alert(res.data.message || 'Signed in successfully');
            if (res.data?.jwtToken){
                localStorage.setItem('token', res.data.jwtToken);
            }
            this.setState({redirectTo:'/home'})
        }catch(err){
            const msg = err?.response?.data?.message || err.message || 'Sign in failed';
            alert(msg);
        }
        
    }

    render() {
        if (this.state.redirectTo) return <Navigate to= {this.state.redirectTo} replace />;
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value = {this.state.email}
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
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <p className="forgot-password text-right">
                     Forgot <a href="#">password?</a>
                </p>
            </form> 
        );
    }
}

