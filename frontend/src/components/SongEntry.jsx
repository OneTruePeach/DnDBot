import React from 'react'
import toast from 'react-hot-toast'
import { PlayIcon } from 'lucide-react'

const SongEntry = ({displayName, filename}) => {
  return (
    <button className="h-16 btn btn-primary btn-soft btn-block justify-between hover:bg-secondary"
        onClick={() => {
            toast.success(`Telling bot to play: ${displayName}`)
            fetch(`http://localhost:5001/api/SongRequest/${filename}`);
            //axios.post(filename to localhost:5001/api/SongRequest/)
        }}
    >
        <p className="text-3xl text-base-100">{displayName}</p>
        <PlayIcon color="#f3f3f4" />
    </button>
  )
}

export default SongEntry