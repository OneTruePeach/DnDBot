import { PlayIcon } from 'lucide-react'
import { useState } from 'react'
import SongEntry from './SongEntry'

const SoundList = ({title}) => {

  const fullSoundList = title == 'Songs' ? [
      [ "Casual",                "casual-new" ],
      [ "Sadge",                        "sad" ],
      [ "Spooky",                    "spooky" ],
      [ "Chill Overview",    "overview-chill" ],
      [ "Combat",                    "combat" ],
      [ "Combat 2",                "combat-2" ],
      [ "Combat 3",                "combat-3" ],
      [ "Midnight Sky",        "midnight-sky" ],
      [ "Adevage",                  "adevage" ],
      [ "Arth",                        "arth" ],
      [ "Court of Dawn",      "court-of-dawn" ],
      [ "Desert (Day)",          "desert-day" ],
      [ "Desert (Night)",      "desert-night" ],
      [ "Insilit",                  "insilit" ],
      [ "Osiris",                    "osiris" ],
      [ "Seld",                        "seld" ],
      [ "Duvroth (General)",        "duvroth" ],
      [ "Flint (General)",            "flint" ],
      [ "Kallayo and Flint",  "kallayo-flint" ],
      [ "Kallayo (About Mom)",  "kallayo-mom" ],
      [ "Kallayo (Stressed)","kallayo-stress" ],
      [ "Tezar",              "kallayo-tezar" ],
      [ "Tezar (Death)","kallayo-tezar-death" ],
      [ "Kiraya (Peaceful)","kiraya-at-peace" ],
      [ "Kiraya (About Mom)",    "kiraya-mom" ],
      [ "Kiraya shop",          "kiraya-shop" ],
      [ "Kiraya (Sombre)",    "kiraya-sombre" ],
      [ "Meadow (General)",          "meadow" ],
      [ "Meadow Music Box","meadow-music-box" ],
      [ "Sovia (Peaceful)",     "sovia-happy" ],
      [ "Zh\'era (Happy)",      "zhera-happy" ],
      [ "Zh\'era (Sombre)",    "zhera-sombre" ],
    ] : [
      ["Rain", "rain"],
      ["Soft Wind", "soft-wind"],
      ["Songbirds", "songbirds"]
    ]

  const [sounds, setSounds] = useState(fullSoundList);

  var soundComponents = sounds.map(item => (
    <SongEntry displayName={item[0]} filename={item[1]}/>
  ));

  function handleSearchChange(search) {
    setSounds(fullSoundList.filter((sound) => (
      sound[0].toLowerCase().includes(search.target.value.toLowerCase())
    )));
  }

  return (
    <div className="flex flex-col p-4 space-y-4 mt-4 rounded-box bg-base-200 border">
        <div className="flex w-96 justify-between">
          <p className="text-5xl font-bold text-primary">{title}</p>
          <input type="search" onChange={(a) => {handleSearchChange(a)}} className="grow rounded-xl border ml-4 mr-4 max-w-24" placeholder="  Search" />
        </div>
        <div className="flex flex-col w-full h-96 overflow-auto p-4 space-y-2 border-t-2">
            {soundComponents}
        </div>
    </div>
  )
}

export default SoundList