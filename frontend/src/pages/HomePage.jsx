import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import NotesCard from '../components/NotesCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';
const HomePage = () => {
    const [isRateLimited, setIsRateLimited]=useState(false);
    const [notes, setNotes]=useState([]);
    const [isLoading, setIsLoading]=useState(true);

     const fetchNotes = async ()=>{
           try {
        const res = await api.get("/notes");
        console.log(res.data, "res");
        
            setNotes(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log("error fetching notes");
            console.log(error);
            if(error.response?.status===429){
                setIsRateLimited(true);
            }else{
                toast.error("Failed to load notes")
            } 
        }
        finally{
                setIsLoading(false);
            }
     }
    useEffect(()=>{
    
     fetchNotes();
    },[]);
    
   if(isLoading){
  return(
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10'/>
    </div>
  )
}
  return (
    <div className='min-h-screen'>
      <NavBar/>
      {isRateLimited && <RateLimitedUI/>}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {/* {isLoading && <div className='text-center text-primary py-10'>Loading notes...</div> } */}
        {/* {notes.length===0 && !isRateLimited && <NotesNotFound/>} */}
        {
            notes.length>0 && !isRateLimited ?(
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note)=>{ 
                        return(                   
                        <NotesCard key={note?._id} note={note} setNotes={setNotes}/>
                        )
                    })}
                </div>
            )
            :<NotesNotFound/>
        }
      </div>
    </div>
  )
}

export default HomePage
