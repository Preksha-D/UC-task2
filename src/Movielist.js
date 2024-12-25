import Swal from 'sweetalert2'
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import EyeBtn from './eye';

const Movielist = ({movies}) => {

    const sweetAlert = (movie) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              deleteMovie(movie.id);
            }
          });
    }

    const deleteMovie = (id) =>{
        fetch('http://localhost:8000/movieData/' +id , {
            method:'DELETE'
        })
        .then(() => {
            window.location.reload();
        })
    }
    
    return ( 
        <div className="movies-list grid justify-center gap-y-14 mx-auto sm:grid-cols-4 sm:gap-x-3 sm:w-5/6 md:grid-cols-5 md:gap-x-5 md:5/6 lg:grid-cols-5 lg:gap-x-10 lg:w-2/3">
            {movies.map((movie) => (
                <div key={movie.id} className='w-52 border rounded-lg overflow-hidden  bg-fuchsia-50 lg:scale-100 md:scale-75 sm:scale-50'>
                    <div className=" overflow-hidden">
                    <img 
                        src={movie.poster} 
                        alt = {movie.title}
                        className="w-full object-cover object-bottom"></img>
                    </div>
                    <div className="flex items-start p-4 flex-col">
                        <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
                        <p className="text-gray-600">{movie.year}</p>
                        <div className="flex flex-row mt-2">
                            <div className="flex flex-row w-full justify-end items-end">
                                <EyeBtn movie={movie} />
                                <div className='relative group'>
                                    <button className="mr-3">
                                        <MdOutlineEdit size={20} color="blue"/>
                                    </button>
                                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Edit
                                    </span>
                                </div>
                                <div className='relative group'>
                                    <button onClick={()=>{sweetAlert(movie)}}>
                                        <MdDeleteOutline size={20} color="red"/>
                                    </button>
                                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default Movielist;