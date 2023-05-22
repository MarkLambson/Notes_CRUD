import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// axios, useNavigate, useState, Link

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    // Submit handler function
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/notes/new", { title, body })
            .then((res) => {
                console.log("Create page success", res)
                navigate('/')
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
                console.log("ERROR => create page submit handler: ", err)
            })
    }

    return (
        <div>

            {/* Navbar */}
            <div className='d-flex flex-row justify-content-between'>
                <div className='leftNav'>
                    <h1 className='text-uppercase'>Write Notes</h1>
                    <p className='text-lowercase'>Write a new note!</p>
                </div>
                <div className='rightNav'>
                    <Link to={'/'}>
                        <p>go back home</p>
                    </Link>
                </div>
            </div>
            <hr />

            {/* Errors */}
            <div>
                {
                    errors.map((err, idx) => {
                        return (
                            <p className='text-danger' key={idx}>{err}</p>
                        )
                    })
                }
            </div>

            {/* Note Form */}
            <div className='input-group input-group-sm mb-3 d-flex justify-content-center'>
                <form onSubmit={handleSubmit}>
                    {/* Note Title */}
                    <div className='input-group-text'>
                        <label>Note Title</label>
                        <br />
                        <input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            type="text" />
                    </div>
                    <br />
                    {/* Note Body */}
                    <div className='input-group-text'>
                        <label>Note Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                    </div>
                    <br />

                    {/* Create Note Button */}
                    <div>
                        <button className='btn btn-success btn-lg'>Write this note!</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Create