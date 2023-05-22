import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

// axios, useNavigate, useState, Link, useEffect, useParams

const Edit = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then((res) => {
                console.log("Edit page get request", res)
                const note = res.data.results;
                setTitle(note.title)
                setBody(note.body)
            })
            .catch((err) => {
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
                console.log("ERROR => edit page get request: ", err)
            })
    }, [])

    // Form submit handler
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedNote = { title, body };
        axios.put(`http://localhost:8000/api/notes/update/${id}`, updatedNote, { new: true })
            .then((res) => {
                console.log("Edit page put request", res)
                navigate('/')
            })
            .catch((err) => {
                console.log("ERROR => edit page put request: ", err)
            })
    }

    // Delete button function
    const deleteNote = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/api/notes/delete/${id}`)
            .then((res) => {
                console.log("Note deleted successfully", res)
                navigate('/')
            })
            .catch((err) => {
                console.log("ERROR => note delete: ", err)
            })
    }

    return (
        <div>

            {/* Navbar */}
            <div className='d-flex flex-row justify-content-between'>
                <div className='leftNav'>
                    <h1 className='text-uppercase'>Note</h1>
                </div>
                <div className='rightNav'>
                    <Link to={'/'}>
                        <p>go back home</p>
                    </Link>
                </div>
            </div>

            {/* Errors */}
            <div>
                {
                    errors.map((err, idx) => {
                        return (
                            <p className='error' key={idx}>{err}</p>
                        )
                    })
                }
            </div>

            {/* Note Form */}
            <div className='input-group input-group-sm mb-3 d-flex justify-content-center'>
                <form id='edit-form' onSubmit={handleSubmit}>
                    {/* Note Title */}
                    <div className='input-group-text'>
                        <label>Note Title</label>
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
                            onChange={(event) => setBody(event.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                    </div>
                </form>
            </div>

            {/* Edit and Delete Buttons */}
            <div id='edit-delete'>
                <button form='edit-form' className='btn btn-outline-info'>Edit Note</button>
                <button className='btn btn-outline-danger' onClick={deleteNote}>Delete Note</button>
            </div>

        </div>
    )
}

export default Edit