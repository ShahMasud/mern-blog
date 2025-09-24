import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router';
import api from '../lib/axios';
import { ArrowLeftIcon, ArrowUpIcon, LoaderCircle, LoaderIcon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
  const [note, setNote]= useState(null);
  const [loading, setLoading]=useState(false);
  const [saving, setSaving]=useState(false);

  const navigate = useNavigate();
  const {id} = useParams();
  
       const fetchNotes = async ()=>{
           try {
        const res = await api.get(`/notes/${id}`);        
            setNote(res.data);
            setLoading(false);
        } catch (error) {
            console.log("error fetching note", error);
            console.log("Failed to fetch the note");
           
        }
        finally{
                setLoading(false);
            }
     }
    useEffect(()=>{
    
     fetchNotes();
    },[]);

      const handleDelete = async()=>{
        if(!window.confirm("Are you sure to delete this note?")) return;
        if(!id){
            toast.error("Note not found");
        }
        
        setLoading(true);

        try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted");
        navigate("/")
        setNote(prev => prev.filter(n => n._id !== id));
        } catch (error) {
            console.log("error deleting note", error);
            toast.error("Failed to delete note")
        }
        
    }
    const handleSave= async()=>{
        if(!note.title.trim() || !note.content.trim()){
          toast.error("Please add a title or content");
          return;
        }

        setSaving(true);

        try {
        await api.put(`/notes/${id}`, note);
        toast.success("Note updated successfully!");
        navigate("/")
        } catch (error) {
            console.log("error saving the note", error);
            toast.error("Failed to update note")
        } finally{
          setSaving(false)
        }
    }
  
if(loading){
  return(
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10'/>
    </div>
  )
}
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back to Notes
            </Link>
             <button className='btn btn-ghost' onClick={handleDelete}>
            <Trash2Icon className='h-5 w-5'/>
            Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text" placeholder='Note Title' className='input input-bordered'
                  value={note?.title}
                  onChange={(e)=>setNote({...note, title:e.target.value})}
                />
              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='Write your note here...' className='textarea textarea-bordered h-32'
                  value={note?.content}
                  onChange={(e)=>setNote({...note, content:e.target.value})}
                />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving? "Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NoteDetailPage
