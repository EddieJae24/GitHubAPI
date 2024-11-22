import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
// import savedCandidates from './SavedCandidates';

function CandidateSearch() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const loadCandidates = async () => {
      setLoading(true);
      try {
        const data = await searchGithub();
        setCandidates(data);
        setCurrentCandidate(data[0]); // Set the first candidate
      } catch (err) {
        setError('Error loading candidates');
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      setSavedCandidates((prev) => [...prev, currentCandidate]);
      nextCandidate();
    }
  };

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

  const searchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await searchGithubUser(username);
      setCurrentCandidate(user);
      setCandidates([]); // Clear other candidates to show the specific user only
    } catch (err) {
      setError('User not found or an error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading && <p>Loading candidates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Search by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={searchUser}>Search</button>
      </div>

      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url ?? ''} alt={currentCandidate.name ?? currentCandidate.login ?? ''} width="100" />
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || 'Not provided'}</p>
          <p>Email: {currentCandidate.email || 'Not provided'}</p>
          <p>Company: {currentCandidate.company || 'Not provided'}</p>
          <a href={currentCandidate.html_url ?? ''} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <div>
            <button onClick={handleSaveCandidate}>+</button>
            <button onClick={nextCandidate}>-</button>
          </div>
        </div>
      ) : (
        !loading && <p>No more candidates to review.</p>
      )}
    </div>
  );
}

export default CandidateSearch;







// import { useState, useEffect } from 'react';
// import { searchGithub, searchGithubUser } from './api/API';

// const CandidateSearch = () => {
//   return <h1>CandidateSearch</h1>;
// };

// export default CandidateSearch;
