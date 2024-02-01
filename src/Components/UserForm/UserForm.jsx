import React, { useContext, useState } from "react";
import { MoviesContext } from "../../context/MoviesContext";
import { useNavigate } from "react-router-dom";
import './UserForm.css';

function UserForm({ submitFunction, isNewUser })
{
    const navigate = useNavigate()
    const { gender, setUserInfo, setLogged } = useContext(MoviesContext)
    const [user, setUser] = useState({
        id: 0,
        Name: '',
        Last_name: '',
        Last_name2: '',
        Username: '',
        Email: '',
        Passwrd: '',
        Birthday: '',
        IdGender: 0
    })

    const onHandleName = (value) =>{
        setUser({
            ...user,
            Name: value
        })
    }

    const onHandleLastName = (value) =>{
        setUser({
            ...user,
            Last_name: value
        })
    }

    const onHandleLastName2 = (value) =>{
        setUser({
            ...user,
            Last_name2: value
        })
    }

    const onHandleUsername = (value) =>{
        setUser({
            ...user,
            Username: value
        })
    }

    const onHandleEmail = (value) =>{
        setUser({
            ...user,
            Email: value
        })
    }

    const onHandlePasswrd = (value) =>{
        setUser({
            ...user,
            Passwrd: value
        })
    }

    const onHandleBirthday = (value) =>{
        setUser({
            ...user,
            Birthday: value
        })
    }

    const onChangeGender = (idGender) =>{
        setUser({
            ...user,
            idGender: Number(idGender)
        })
    }

    const onSubmitHandle = async (event) =>{
        event.preventDefault();
        const result = await submitFunction(user);
        alert(result.message + ' '+ result.idStatus)
        if(isNewUser){
            setUserInfo(user);
            setLogged(true);
            navigate('/');

        }
        
    }

    return(
        <div>
            <form onSubmit={onSubmitHandle} className="user-form-container">
                <div className="row-user">
                    <div className="user-form-group">
                        <label className="user-form-label">First Name</label>
                        <input className="user-form-input" placeholder="First Name" type="text" value={user.Name} onChange={(event) => onHandleName(event.target.value)} />
                    </div>
                    
                    <div className="user-form-group">
                        <label className="user-form-label">Last Name</label>
                        <input className="user-form-input" placeholder="Last Name" type="text" value={user.Last_name} onChange={(event) => onHandleLastName(event.target.value)} />
                    </div>

                    <div className="user-form-group">
                        <label className="user-form-label">Last Name(Mother)</label>
                        <input className="user-form-input" placeholder="Last Name Mother" type="text" value={user.Last_name2} onChange={(event) => onHandleLastName2(event.target.value)} />
                    </div>
                </div>

                <div className="row-user">
                    <div className="user-form-group">
                        <label className="user-form-label">Username</label>
                        <input className="user-form-input" placeholder="Username" type="text" value={user.Username} onChange={(event) => onHandleUsername(event.target.value)} />
                    </div>

                    <div className="user-form-group">
                        <label className="user-form-label">Email</label>
                        <input className="user-form-input" placeholder="Email@gmail.com" type="email" value={user.Email} onChange={(event) => onHandleEmail(event.target.value)} />
                    </div>

                    <div className="user-form-group">
                        <label className="user-form-label">Passwrd</label>
                        <input className="user-form-input" placeholder="Password" type="password" value={user.Passwrd} onChange={(event) => onHandlePasswrd(event.target.value)} />
                    </div>
                </div>

                <div className="row-user">
                    <div className="user-form-group">
                        <label className="user-form-label">Birthday</label>
                        <input className="user-form-input" placeholder="Birthday" type="date" value={user.Birthday} onChange={(event) => onHandleBirthday(event.target.value)} />
                    </div>

                    <div className="user-form-group">
                        <label className="user-form-label">Gender:</label>
                        <select className="user-form-input" value={user.idGender} onChange={(event) => onChangeGender(event.target.value)}>
                            <option value='0'>Select a gender</option>
                            {
                                gender.map(item => {
                                    return(<option value={item.idGender}>{item.name}</option>)
                                })
                            }
                        </select>  
                    </div>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export { UserForm }