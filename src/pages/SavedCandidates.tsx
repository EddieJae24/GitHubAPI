import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

function SavedCandidates() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url ?? ''} alt={candidate.name ?? ''} width="50" />
              <h2>{candidate.name || candidate.login}</h2>
              <p>Username: {candidate.login}</p>
              <p>Email: {candidate.email || 'Not provided'}</p>
              <p>Location: {candidate.location || 'Not provided'}</p>
              <p>Company: {candidate.company || 'Not provided'}</p>
              <a href={candidate.html_url ?? ''} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
              <button onClick={() => removeCandidate(candidate.id ?? 0)}>-</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved candidates found.</p>
      )}
    </div>
  );
}

export default SavedCandidates;



// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;
