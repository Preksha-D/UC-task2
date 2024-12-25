import { BsSend } from "react-icons/bs";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Add = () => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [watched, setWatched] = useState(false);


    const handleSubmit = async (e) =>{
        e.preventDefault();
           
        const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=661afec2&t=' + encodeURIComponent(title));
        const dataAPI = await response.json();

        if (dataAPI.Response === "False"){
            setError("Movie doesn't exist. Please try a different title or check the spelling");
            return;
        }

        let newTitle = dataAPI.Title;
        let poster = dataAPI.Poster;
        let year = dataAPI.Year;

        const newMovie = {
            title : newTitle,
            poster,
            year,
            watched,
        };

        fetch('http://localhost:8000/movieData', {
            method : 'POST',
            headers : { "Content-Type" : "application/json"},
            body: JSON.stringify(newMovie)
        }).then(() =>{
            console.log("added");
            
        })

        setTitle('');
        window.location.reload();
    }

    return ( 
        <div className="w-full flex justify-center items-center flex-col">
            <form className="flex flex-row justify-center items-center  p-5 pr-14 pl-14" onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Movie Title" 
                className="border p-1 w-64 border-fuchsia-200" 
                onChange={(e) => { setTitle(e.target.value)}}
                required>
                </input>
                <button type="button" className="ml-7 mr-10 mt-1" onClick={()=>{setWatched(!watched)}}>
                    {!watched && <FaRegEye  size={20} color="#9999bb"/>}
                    {watched && <FaEye  size={20} color="black"/>}
                </button>
                <button className="p-4 justify-self-end" type="submit">
                    <BsSend size={20}/>
                </button>
            </form>
            {error && <div className="text-red-500">{error}</div>}
        </div>
     );
}
 
export default Add;