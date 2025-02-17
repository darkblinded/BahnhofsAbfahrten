import FavEntry from './FavEntry';
import React from 'react';

const mostUsed = [
  { title: 'Frankfurt (Main) Hbf', id: '8098105' },
  { title: 'Hannover Hbf', id: '8000152' },
  { title: 'Stuttgart Hbf', id: '8000096' },
  { title: 'Köln Hbf', id: '8000207' },
  { title: 'Hamburg Hbf', id: '8002549' },
  { title: 'Berlin Hauptbahnhof', id: '8011160' },
  { title: 'Düsseldorf Hbf', id: '8000085' },
  { title: 'Mannheim Hbf', id: '8000244' },
  { title: 'Villingen (Schwarzw)', id: '8000366' },
  { title: 'Karlsruhe Hbf', id: '8000191' },
  { title: 'Wuppertal Hbf', id: '8000266' },
  { title: 'Nürnberg Hbf', id: '8000284' },
  { title: 'München Hbf', id: '8000261' },
  { title: 'Bonn Hbf', id: '8000044' },
  { title: 'Leipzig Hbf', id: '8098205' },
];

// eslint-disable-next-line react/display-name
const MostUsed = () => (
  <>
    {mostUsed.map(m => (
      <FavEntry noDelete key={m.id} fav={m} />
    ))}
  </>
);

export default React.memo(MostUsed);
