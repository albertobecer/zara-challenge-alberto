import React from 'react';
import './CharacterComics.css';
import useFetch from '../hooks/useFetch';
import Loading from './Loading';

interface Thumbnail {
          path: string;
          extension: string;
}

interface Comic {
          id: number;
          title: string;
          thumbnail: Thumbnail;
}

interface CharacterData {
          results: Comic[];
}

interface ComicsProps {
          characterid: number;
}

const CharacterComics: React.FC<ComicsProps> = ({ characterid }) => {
          const VITE_ENDPOINT_CHARACTER = import.meta.env.VITE_ENDPOINT_CHARACTER as string;
          const VITE_ENDPOINT_SERIES = import.meta.env.VITE_ENDPOINT_SERIES as string;
          const VITE_ENDPOINT_KEY = import.meta.env.VITE_ENDPOINT_KEY as string;
          const infoCharacter = useFetch<CharacterData>(`${VITE_ENDPOINT_CHARACTER}${characterid}${VITE_ENDPOINT_SERIES}${VITE_ENDPOINT_KEY}`, {});

          return (
                    <>
                              {infoCharacter.loading && <Loading />}
                              <div id="character-comics">
                                        <h3>COMICS</h3>
                                        <ul>
                                                  {infoCharacter.data && infoCharacter.data.results && infoCharacter.data.results.map((comic: Comic, index: number) => (
                                                            <li key={index}>
                                                                      <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                                                                      <h4>{comic.title}</h4>
                                                            </li>
                                                  ))}
                                        </ul>
                              </div>
                    </>
          );
};

export default CharacterComics;
