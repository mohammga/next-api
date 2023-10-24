"use client";

import { useState, useEffect } from 'react';
import CardGrid from "@/components/poll/CardGrid";
import SePollGrid from '@/components/poll/SePollGrid';
import TatPollGrid from '@/components/poll/TatPollGrid';


function PollDashboard() {
  const [myPolls, setMyPolls] = useState([]);
  useEffect(() => {
    fetch('/api/polls')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(polls => setMyPolls(polls.data))
      .catch(error => console.error('There was a problem with the fetch operation:', error.message));
  }, []);  


  return (
    <div>
      <CardGrid data={myPolls.map(poll => poll)} title={"Pollify Samfunnet"} />
      <SePollGrid data={myPolls.map(poll => poll)} title={"Mine Poll"} />
      <TatPollGrid data={myPolls.map(poll => poll)} title={"Gjennomførte Poll"} />
    </div>
  );
}
export default PollDashboard;