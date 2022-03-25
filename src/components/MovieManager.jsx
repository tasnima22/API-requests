import { useState } from "react";
import axios from 'axios';

const MovieManager = () => {

    const[data, setData] = useState([]);

    const[query, setQuery] = useState("");

    const[id, setId] = useState(0); 

    const[newMovie, setNewMovie] = useState({});



    const getData = () => {
        axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=68baa035/${query}`)
        .then((response) => {
            console.log(response); 
            console.log(response.data.data);
            if(Array.isArray(response.data.data)){  
                setData(response.data.data)
            } else {
                setData([response.data.data]); 
            }
        }) 
    }

    const deleteData = () => {
        axios.delete(`http://www.omdbapi.com/?i=tt3896198&apikey=68baa035/${id}`)
        .then(() => {
            console.log("Movie Deleted");
        });
    }

    const setObject = (event) => {
        const {name, value} = event.target;
        setProfile((prevValue) => ({
            ...prevValue, [name]: value,
        }));
    };

    const postData = () => {
        axios.post(`http://www.omdbapi.com/?i=tt3896198&apikey=68baa035`, newMovie) 
        .then((response) => {
            console.log(response);
        })
    }    

    const putData = () => {
        axios.put(`http://www.omdbapi.com/?i=tt3896198&apikey=68baa035`, newMovie)
        .then((response) => {
            console.log(response); 
        })
    }

    return ( 
        <>
        {/* Get All or get by id */}
            <input type="text" value={query} onChange={(e) => {setQuery(e.target.value)}}/>
            <button type="button" onClick={() => {getData()}}> Click me to see data! </button>
            <br></br>
            {/* Delete by id */}
            <input type="number" value={id} onChange={(e) => setId(e.target.value)}/>
            <button type="button" onClick={() => {deleteData()}}> Delete By ID </button>
            <br></br>

            {/* Posting Data */}
            <input type="text" value={newMovie.title} name="Title" onChange={setObject} placeholder="Enter Title"/>
            <input type="text" value={newMovie.year} name="Year" onChange={setObject} placeholder="Enter Year"/>
            <button type="button" onClick={postData}> Click me to post Data </button>
            {/* Returning Data */}

            {/*Replacing Data */}

            {
                data.map((newMovie, key) => {
                    return <h2> Name: {newMovie.title}</h2>
                })
            }
        </>
     );
}
 
export default MovieManager;