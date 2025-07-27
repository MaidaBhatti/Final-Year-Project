import React, { useState, useEffect, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const MusicPlayerScreen = () => {
  const [musicSource, setMusicSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [favorites, setFavorites] = useState([]);

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const artistName = 'CalmPalm';
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song&limit=100`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          throw new Error('No track data found');
        }

        const track = data.results[0];
        setMusicSource(track.previewUrl);
        setSongs(data.results);
        setCurrentTrack(track);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTrackData();
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.trackId === currentTrack.trackId);
    const nextIndex = currentIndex + 1;
    if (nextIndex < songs.length) {
      const nextTrack = songs[nextIndex];
      setMusicSource(nextTrack.previewUrl);
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const addToFavorites = (song) => {
    if (!favorites.some(fav => fav.trackId === song.trackId)) {
      setFavorites([...favorites, song]);
    }
  };

  const playSong = (song) => {
    setMusicSource(song.previewUrl);
    setCurrentTrack(song);
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleEnded = () => playNext();
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [musicSource, volume]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>;

  return (
    <div style={{ padding: 20, backgroundColor: '#FFE5E5', minHeight: '100vh' }}>
      <Tabs>
        <TabList>
          <Tab>Player</Tab>
          <Tab>All Songs</Tab>
        </TabList>

        <TabPanel>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 20 }}>
              <img
                src={currentTrack?.artworkUrl100}
                alt="Album Cover"
                style={{ width: 250, height: 250, borderRadius: '50%' }}
              />
            </div>
            <h2>{currentTrack?.trackName}</h2>
            <p>{currentTrack?.artistName}</p>

            <audio ref={audioRef} src={musicSource} autoPlay={isPlaying} />

            <div style={{ margin: '20px 0' }}>
              <button onClick={togglePlayback}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={playNext} style={{ marginLeft: 10 }}>
                Next
              </button>
            </div>

            <div>
              <label>Volume: </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <button onClick={() => addToFavorites(currentTrack)}>
                <span style={{ color: favorites.some(fav => fav.trackId === currentTrack?.trackId) ? 'red' : 'black' }}>
                  ♥
                </span> Add to Favorites
              </button>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {songs.map(song => (
              <li
                key={song.trackId}
                onClick={() => playSong(song)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={song.artworkUrl60}
                  alt={song.trackName}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{song.trackName}</div>
                  <div style={{ color: '#666' }}>{song.artistName}</div>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MusicPlayerScreen;
