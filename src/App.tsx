import React, { useEffect } from 'react';
import VideoPlayer from './components/video/VideoPlayer';
import useFetch from './hooks/useFetch';
import { useAtom } from 'jotai';
import { sourceAtom } from './state/core';

const App: React.FC = () => {
  const [_, setSource] = useAtom(sourceAtom);
  const { data, loading, error } = useFetch(
    'http://localhost:3000/data.json'
    // 'https://gist.githubusercontent.com/Justinkarso/c3bb57f004e94e5644374ff3d01268c4/raw/6520b9cd6ff629718122d14c83417eb87d13364e/gistfile1.txt'
  );

  useEffect(() => {
    if (data) {
      setSource(
        'https://res.cloudinary.com/dogwt5bij/video/upload/v1698259362/vlt4yrznidl81xgh4hzy.mp4'
      );
    }
  }, [data]);

  if (!error && loading) {
    return (
      <main className="container">
        <div className="frame">
          <h2>Loading video...</h2>
          <p>Please wait</p>
        </div>
      </main>
    );
  }

  if (!error && !loading) {
    return (
      <main className="container">
        <div className="frame">
          <h2>The Netherlands - Highlights</h2>
          <p>
            A short video of the Dutch football team, with some highlights of
            the best goals.
          </p>
          <VideoPlayer data={data} />
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="frame">
        <h2>Something went wrong</h2>
        <p>Please try again later</p>
      </div>
    </main>
  );
};

export default App;
