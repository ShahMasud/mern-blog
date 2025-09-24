import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import api from '../lib/axios';
const NotesCard = ({note, setNotes}) => {
      const [isLoading, setIsLoading]=useState(false);
  
      const deleteNote = async(e, id)=>{
        e.preventDefault();
        if(!window.confirm("Are you sure to delete this note?")) return;
        if(!id){
            toast.error("Note not found");
        }
        
        setIsLoading(true);

        try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully!");
        setNotes(prev => prev.filter(n => n._id !== id));
        // fetchNotes();
        } catch (error) {
            console.log("error deleting note");
            toast.error("Failed to delete note")
        }
        finally{
                setIsLoading(false);
            }
    }
  return (
    <div className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
      <div className='card-body'>
    <Link to={`/note/${note._id}`}>

        <h3 className='card-title text-base-content'>
            {note.title}
        </h3>
        <p className='text-base-content/70 line-clamp-3'>
            {note.content}
        </p>
    </Link>

        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>{note.createdAt}</span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button onClick={(e)=>deleteNote(e, note?._id)} className='btn btn-ghost btn-xs text-error' disabled={isLoading}>
                    <Trash2Icon className='size-4'/>
                </button>
            </div>
        </div>
      </div>
      </div>
  )
}

export default NotesCard
