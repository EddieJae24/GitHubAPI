import { type FormEvent, useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate  from '../interfaces/Candidate.interface';

// import savedCandidates from './SavedCandidates';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>
        ({id: 0, 
          login: '', 
          avatar_url: '', 
          html_url:'',
          name: '',
          location: '',
          email: '',
          company: '',
        
        });
            
  const [searchInput, setSearchInput] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const addToCandidates = (candidate: Candidate) => {
    let parsedCandidates: Candidate[] = [];
    
    // Retrieve existing candidates from localStorage
    const savedCandidates = localStorage.getItem('storedCandidates');
    
    if (savedCandidates) {
      parsedCandidates = JSON.parse(savedCandidates); // Parse existing candidates
    }
  
    // Avoid duplicate candidates
    if (!parsedCandidates.some((saved) => saved.id === candidate.id)) {
      parsedCandidates.push(candidate); // Add new candidate
      localStorage.setItem('storedCandidates', JSON.stringify(parsedCandidates)); // Save updated list
      alert('Candidate saved successfully!');
    } else {
      alert('Candidate is already saved.');
    }
  };


  const searchForCandidateByUsername = async (event:FormEvent, username: string) => {
    try {
    event.preventDefault();
    const data: Candidate = await searchGithubUser(username);
    setCurrentCandidate(data);} 
    
    catch (error) {console.error(error);};
    };

    // Save the current candidate to the list of saved candidates
  const handleSaveCandidate = () => {
    if (currentCandidate) {
      addToCandidates(currentCandidate); 
    };};

  const nextCandidate = () => {
    if (candidates.length > 1) {
      const next = candidates.slice(1);
      setCandidates(next);
      setCurrentCandidate(next[0] || null);
    } else {
      setCandidates([]);
      setCurrentCandidate(null);
    }
  };


  useEffect(() => {
    const loadCandidates = async () => {
      
      try {
        const data = await searchGithub();
        setCandidates(data);
        setCurrentCandidate(data[0]); // Set the first candidate
      } catch (err) {
        ('Error loading candidates');
      } 
      };

    loadCandidates();
  }, []);

  return (
    <>
      <section>
        <h1>Candidate Search</h1>
        {/* {loading && <p>Loading candidates...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>} */}
      <form onSubmit={(event: FormEvent) => {
        searchForCandidateByUsername(event, searchInput);
        setSearchInput('');
      }}>
        
        <div>
          <input
            type="text"
            name=''
            id=''
            placeholder="Search by username"
            value={searchInput}
            onChange={(event: FormEvent) => setSearchInput((event.target as HTMLInputElement).value)}
          />
          
          <div>
            <button type="submit">Search</button>
          </div>
        </div>
      </form>

      {currentCandidate ? (
          <div>
            <img src={currentCandidate.avatar_url ?? ''} alt={currentCandidate.name ?? currentCandidate.login ?? ''} width="100" />
            <h2>{currentCandidate.name || currentCandidate.login}</h2>
            <p>Username: {currentCandidate.login || 'Not found'}</p>
            <p>Location: {currentCandidate.location || 'Not provided'}</p>
            <p>Email: {currentCandidate.email || 'Not provided'}</p>
            <p>Company: {currentCandidate.company || 'Not provided'}</p>
            <p>Bio: {currentCandidate.bio || 'Not provided'}</p>
            <a href={currentCandidate.html_url ?? ''} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
            <div>
              <button onClick= {() => handleSaveCandidate()}>&#43;</button>
              <button onClick={nextCandidate}>&#8722;</button>
            </div>
          </div>
      ) : (
         <p>No more candidates to review.</p>
      )}
    
    </section>
    </>
  );
};


export default CandidateSearch;








// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from './api/API';

// const CandidateSearch = () => {
//   return <h1>CandidateSearch</h1>;
// };

// export default CandidateSearch;
