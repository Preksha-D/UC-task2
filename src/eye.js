import { FaRegEye } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const EyeBtn = ({movie}) => {
    const [watched, setWatched] = useState(movie.watched);

    const watchUpdate = (id) =>{

        fetch('http://localhost:8000/movieData/' +id, {
            method: 'PATCH',
            headers : { "Content-Type" : "application/json"},
            body: JSON.stringify({watched: !watched})
        }).then(response =>{
            if(response.ok){   
                setWatched(!watched);
            }
            return response.json();
        }).then(data =>{
            console.log("Success");
        }).catch((error) =>{
            console.error(error);
        })
    }

    return ( 
        <div>
            <button className="mr-20 mt-1" onClick={()=>{watchUpdate(movie.id)}}>
                {!watched && 
                    <div className='relative group'>
                        <FaRegEye  size={20} color="#9999bb"/>
                        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Mark as Watched
                        </span>
                </div>
                }
                {watched && 
                    <div className='relative group'>
                        <FaEye  size={20} color="black"/>
                        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Mark as Not Watched
                        </span>
                </div>
                }
            </button>
        </div>
     );
}
 
export default EyeBtn;