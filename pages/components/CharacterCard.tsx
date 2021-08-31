import React from 'react';
import Link from 'next/link';
export interface CharacterCardProps {
    charData: CharData;
}

export interface CharData {
    birth_year: string;
    name: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    films: [];
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ charData }) => {
    return (
        <div className='flex flex-col border-solid border-2 border-black p-2 m-2'>
            <h1 className='w-full flex-auto text-indigo-600'>
                <Link href={`/character/${encodeURIComponent(charData.name)}`}>{charData.name}</Link>
            </h1>
            <div className='flex justify-between content-start'>
                <p className='w-1/2 flex-auto'>{charData.films.length} films</p>
                <p className='w-1/2 flex-auto text-right'>{charData.birth_year}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
