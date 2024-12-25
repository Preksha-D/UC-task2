import {useState, useEffect} from 'react';
import Movielist from './Movielist';
import Add from './Add';

const Watchlist = () => {

    const [movies, setMovies] = useState(null);
    const [addform, setaddform] = useState(false);

    useEffect (() =>{
        fetch('http://localhost:8000/movieData')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setMovies(data);
        })
    }, []);

    return ( 

        <div className='bg-cover w-screen min-h-screen bg-fuchsia-100 flex items-center flex-col'>
            <div className='flex flex-row h-32 pt-10'>
                <h2 className='text-4xl font-bold'>Movie Watchlist</h2>
                <button onClick={() =>{ setaddform(!addform) }} className='bg-fuchsia-700 h-9 ml-32 w-20 rounded-md text-fuchsia-50'>
                    Add
                </button>
            </div>
            {addform && <Add />}
            {movies && <Movielist movies={movies} />}    
        </div>
     );
}
 
export default Watchlist;