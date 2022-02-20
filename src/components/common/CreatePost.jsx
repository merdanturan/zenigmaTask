import React, { useState } from 'react';
import { db } from '../../db';
import { useSelector } from 'react-redux';

import Button from '../basic/Button';
import Input from '../basic/Input';


const CreatePost = () => {
    //States
    const [header, setHeader] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("");
    const { user } = useSelector(state => state.auth)

    //Post submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db.posts.add({
                blogger: user,
                header: header,
                content: content,
                createdAt: new Date(),
                readBy: [],
            });
            setHeader("")
            setContent("")
        } catch (error) {
            setError(error.message)
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='formHeader'>Create a post!</div>
                {error && <div className='alert'>{error}</div>}
                <Input value={header} onChange={v => setHeader(v)} placeholder={"Post Header"} />
                <Input value={content} onChange={v => setContent(v)} placeholder={"Post Content"} area />
                <Button submit full>Create!</Button>
            </form>
        </div>
    )
}

export default CreatePost