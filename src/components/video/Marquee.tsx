import { useAtom } from 'jotai';
import React from 'react';
import { dataAtom } from '../../state/core';

const Marquee = () => {
  const [data] = useAtom(dataAtom);
  const tickerData = data.ticker || [];

  return (
    <div className="marquee">
      <div className="marquee-slide">
        {tickerData.map((item) => (
          <span key={item.id}>{item.body}</span>
        ))}
      </div>

      <div className="marquee-slide">
        {tickerData.map((item) => (
          <span key={item.id}>{item.body}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
