import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./SignInForm.module.css";

import { toast } from 'react-toastify';

const SignInForm = (props) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    
    const { email, password } = inputs;

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name] : event.target.value});
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {

            const body = { email, password };

            const response = await fetch("http://localhost:5000/auth/login", { method: "POST", headers : {"Content-Type": "application/json"}, body: JSON.stringify(body)});

            const parseRes = await response.json();

            if( parseRes.token )
            {
                localStorage.setItem("token", parseRes.token);
                props.setAuth(true);
                toast.success("Login successful!");
            } else {
                props.setAuth(false);
                toast.error(parseRes);
            }

            

        } catch (error) {
            
            try {

                const body = { email, password };
    
                const response = await fetch("http://localhost:5000/students/login", { method: "POST", headers : {"Content-Type": "application/json"}, body: JSON.stringify(body)});
    
                const parseRes = await response.json();
                console.log(parseRes);
                if( parseRes.token )
                {
                    localStorage.setItem("token", parseRes.token);
                    props.setAuth(true);
                    toast.success("Login successful!");
                } else {
                    props.setAuth(false);
                    toast.error(parseRes);
                }
    
                
    
            } catch (error) {
                
                console.error(error.message);
            }
        }
    }
    return (
        <Fragment>
        <div className={styles.formCenter}>
            <form className={styles.formFields} onSubmit={onSubmitForm}>
                <div className={styles.formField}>
                    <label className={styles.formFieldLabel} htmlFor="email">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.formFieldInput}
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={event => onChange(event)}
                    />
                </div>

                <div className={styles.formField}>
                    <label className={styles.formFieldLabel} htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={styles.formFieldInput}
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={event => onChange(event)}
                    />
                </div>

                <div className={styles.formField}>
                    <button className={styles.formFieldButton}>Sign In</button>{" "}
                    <Link to="/" className={styles.formFieldLink}>
                        Create an account
                    </Link>
                    
                </div>
                <div className={styles.formField}>
                    <Link to="/team-bandit-guest">
                        <button className={styles.formFieldButton}>Guest Sign In</button>{" "}
                    </Link>
                </div>
            </form>
        </div>
        </Fragment>
    );
};

export default SignInForm;
