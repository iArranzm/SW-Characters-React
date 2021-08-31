import Head from 'next/head';
import { useEffect, useState } from 'react';
import CharacterCard from './components/CharacterCard';
import Header from './components/Header';
import { getCharacters } from './services/Swapi';
import { v4 } from 'uuid';

export default function Home() {
    const [characters, setCharacters] = useState([]);
    const [next, setNext] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const populateList = (next?: string) => {
        setIsLoading(true);
        getCharacters(next).then(data => {
            setCharacters([...characters, ...data.results]);
            setNext(data.next);
            setIsLoading(false);
        });
    };
    useEffect(() => {
        populateList();
    }, [setCharacters]);
    return (
        <>
            <Head>
                <title>Star Wars Characters</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='container mx-auto p-2'>
                <Header />
                <div className='container mx-auto grid lg:grid-cols-5 grid-cols-1'>
                    {characters &&
                        characters.map(character => {
                            return <CharacterCard key={v4()} charData={character}></CharacterCard>;
                        })}
                </div>
                {next && (
                    <div className='container mx-auto text-center lg:text-left'>
                        <button
                            className='border border-solid border-black rounded-md p-1 hover:bg-gray-100 disabled:opacity-50 m-2'
                            onClick={() => populateList(next)}
                            disabled={isLoading}
                        >
                            {' '}
                            Load More
                        </button>
                    </div>
                )}
                {isLoading && <p>List is being loaded, it may take some time!</p>}
            </main>
        </>
    );
}
