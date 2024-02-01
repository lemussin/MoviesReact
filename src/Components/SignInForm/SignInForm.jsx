import React, { useContext, useState } from "react";
import './SignInForm.css';
import { MoviesContext } from "../../context/MoviesContext";
import { useNavigate } from "react-router-dom";

function SignInForm()
{
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(true)
    const { validateSignIn, getUserInformation, setLogged } = useContext(MoviesContext);

    const [userSignIn, setUserSignIn] = useState({
        username: '',
        password: ''
    });

    const onChangeusername = (value) =>{
        setUserSignIn({
            ...userSignIn,
            username: value
        })
    }

    const onChangePassword = (value) =>{
        setUserSignIn({
            ...userSignIn,
            password: value
        })
    }

    const onSubmitFn = async (event) =>{
        event.preventDefault();
        const result = await validateSignIn(userSignIn);
        if(result.idStatus === 1)
        {
            setLogged(true);
            let status = await getUserInformation(result.idRow);
            navigate('/');
        }
        else{
            setShowAlert(false)
        }
    }

    return(
        <div>
            <h4 className="subtitle">Enter your credentials</h4>

            <form className="form-container" onSubmit={(event) => onSubmitFn(event)}>
                <div className="form-group-container">
                    <label className="form-group-label">Username</label>
                    <input className="form-group-input" type="text" placeholder="Username" value={userSignIn.username} 
                        onChange={(event) => onChangeusername(event.target.value)}
                    />
                </div>
                <div className="form-group-container">
                    <label className="form-group-label">Password</label>
                    <input className="form-group-input" type="password" placeholder="Password" value={userSignIn.password} 
                        onChange={(event) => onChangePassword(event.target.value)}
                    />
                </div>
                

                <button type="submit" className="form-btn-submit">Submit</button>
            </form>

            <div className="alert alert-danger space" role="alert" hidden={showAlert}>
                User or Password don't exist.
            </div>
        </div>
    )
}

export { SignInForm }