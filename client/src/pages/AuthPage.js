import React, {useState} from "react";
import {check} from "express-validator";

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: '', password : ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }



    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Link cutter</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>

                        <div className="input-field">
                            <input placeholder="Your email"
                                   id="email"
                                   type="text"
                                   name="email"
                                   className="yellow-input"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input placeholder="Your password"
                                   id="password"
                                   type="password"
                                   name="password"
                                   className="yellow-input"
                                   onChange={changeHandler}
                            />
                            <label htmlFor="password">Email</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}}>Login</button>
                        <button className="btn grey lighten-1 black-text">Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}