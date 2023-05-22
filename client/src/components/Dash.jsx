import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// useEffect, axios, useState, Link, useNavigate

const Dash = () => {
    const [notes, setNotes] = useState([]);
    const [reverse, setReverse] = useState(false);//for potential order buttons BLACK BELT
    const navigate = useNavigate();

    // http://127.0.0.1:8000  can be used if localhost is not working
    useEffect(() => {
        axios.get("http://localhost:8000/api/notes")
            .then((res) => {
                console.log("Dashboard get request", res)
                const dashboardNotes = res.data.results
                console.log(dashboardNotes)//checking to see if data is there
                setNotes(dashboardNotes)
            })
            .catch((err) => {
                console.log("ERROR => dashboard get: ", err)
            })
    }, [reverse])

    const newNote = (event) => {
        event.preventDefault();
        navigate('/notes/new');
    }


    return (
        <div>

            {/* Navbar */}
            <div className='d-flex flex-row justify-content-between'>
                <div className='leftNav'>
                    <h1 className='text-uppercase'>Note Wall</h1>
                    <br />
                    <br />
                    <p className='text-lowercase'>Leave a note :)</p>
                </div>
                <div className='rightNav'>
                    <button
                        className=' btn btn-info btn-lg'
                        onClick={(event) => newNote(event)}
                    >
                        Write note
                    </button>
                </div>
            </div>
            <hr />

            {/* List of Notes */}
            {
                notes.map((note, idx) => {
                    return (
                        <div className='card-body' key={idx}>
                            <h2 className='card-title'>{note.title}</h2>
                            <p className='card-body'>{note.body}</p>

                            {/* Edit Button */}
                            <div className='d-flex justify-content-end px-5'>
                                <Link to={`/notes/${note._id}`}>
                                    <p className='btn btn-outline-primary'>edit</p>
                                </Link>
                            </div>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Dash