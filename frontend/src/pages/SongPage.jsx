import React from 'react'
import { ChevronDown, PlayIcon, PlusIcon } from 'lucide-react'
import Navbar from '../components/Navbar'
import SoundList from '../components/SoundList'

const SongPage = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <div className="flex w-full">

                <SoundList 
                    title={'Songs'}
                />

                <div className="divider divider-horizontal divider-accent/50"></div>

                <SoundList 
                    title={'Ambience'}
                />

            </div>
        </div>
    )
}

export default SongPage