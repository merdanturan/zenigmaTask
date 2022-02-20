import React, { useState } from 'react';
import { db } from '../../db';
import { setUser } from '../../store/auth'
import { useLiveQuery } from "dexie-react-hooks";
import { useDispatch } from 'react-redux';

import Button from '../../components/basic/Button';
import Input from '../../components/basic/Input';



const Register = () => {
    ///States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    //Get all users
    const allUsers = useLiveQuery(
        () => db.users.toArray()
    );

    //User registration function and check if user already in system
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!allUsers.find(x => x.email === email)) {
            try {
                await db.users.add({
                    email: email,
                    password: password
                });
                dispatch(setUser(email))
                window.location.reload()
            } catch (error) {
                setError(error.message)
            }
        }
        else {
            setError("User already in system.")
        }
    };

    return (
        <>
            <div className='formHeader'>
                Register
            </div>
            <form onSubmit={handleSubmit}>
                {error && <div className='alert'>{error}</div>}
                <Input onChange={v => setEmail(v)} value={email} placeholder={'E-mail'} type={"email"} required />
                <Input onChange={v => setPassword(v)} value={password} placeholder={'Password'} type={"password"} required />
                <div>
                    <Button full submit>Register</Button>
                </div>
            </form>
        </>
    );
};

export default Register;
