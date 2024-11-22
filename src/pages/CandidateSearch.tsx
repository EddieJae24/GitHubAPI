import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
const [candidates, setCandidates] = useState<Candidate[]>([]);

const [error, setError] = useState<string>('');

const [loading, setLoading] = useState<boolean>(false);

const handleSearch = async () => {
  setLoading(true);
  try {
    const data = await searchGithub();
  setCandidates(data);
  setLoading(false);
  }
  catch (error) {}
  finally {
    setLoading(false);
  }
  
};


  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;





// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from './api/API';

// const CandidateSearch = () => {
//   return <h1>CandidateSearch</h1>;
// };

// export default CandidateSearch;
