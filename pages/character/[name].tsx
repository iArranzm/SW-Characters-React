import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getCharacter } from '../services/Swapi';
import { v4 } from 'uuid';

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

export default function Character() {
    const [charData, setCharData] = useState<CharData>();
    const [filmData, setFilmData] = useState([]);
    const router = useRouter();
    const { name } = router.query;

    const populateData = (charName: string | string[]) => {
        getCharacter(charName).then(data => {
            if (data.count === 1) {
                setCharData(data.results[0]);
                let promiseArray = [];
                data.results[0].films.forEach(film => {
                    promiseArray.push(fetch(film).then(response => response.json()));
                });
                Promise.all(promiseArray).then(data => setFilmData(data));
            }
        });
    };

    useEffect(() => {
        populateData(name);
    }, [setCharData]);
    return (
        <>
            <main className='container mx-auto p-2'>
                <Header />
                <Link href='/'>
                    <a className='text-indigo-600'>Back to list</a>
                </Link>
                {charData && (
                    <div className='container mx-auto'>
                        <h1 className='text-3xl font-bold'>{charData.name}</h1>
                        <div className='grid grid-cols-1 lg:grid-cols-3 m-2'>
                            <p>
                                Height: <span className='capitalize'>{charData.height}</span> cm
                            </p>
                            <p>
                                Gender: <span className='capitalize'>{charData.gender}</span>
                            </p>
                            <p>
                                Mass: <span className='capitalize'>{charData.mass}</span> Kg
                            </p>
                            <p>
                                Hair color: <span className='capitalize'>{charData.hair_color}</span>
                            </p>
                            <p>
                                Eye color: <span className='capitalize'>{charData.eye_color}</span>
                            </p>
                            <p>
                                Skin color: <span className='capitalize'>{charData.skin_color}</span>
                            </p>
                            <p>
                                Birth year: <span className='capitalize'>{charData.birth_year}</span>
                            </p>
                        </div>
                        <h1 className='text-2xl font-bold'>{charData.films.length} Films</h1>
                        {filmData && (
                            <ul className='m-2'>
                                {filmData.map(film => (
                                    <li key={v4()}>
                                        {`-${film.title}: ${
                                            new Date().getFullYear() - new Date(film.release_date).getFullYear()
                                        } years ago`}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!filmData && <p>Film list is being loaded!</p>}
                    </div>
                )}
                {!charData && <p>Character data is being loaded!</p>}
            </main>
        </>
    );
}
