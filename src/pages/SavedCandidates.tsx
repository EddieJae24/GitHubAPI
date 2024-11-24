import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';


function SavedCandidates() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('storedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  useEffect(() => {
    localStorage.setItem('storedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Location</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Remove</th>
            </tr>
          </thead>
          
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url ?? ''} alt={candidate.name ?? ''} width="50" />
                </td>
                <td>{candidate.name || candidate.login}</td>
                <td>{candidate.login}</td>
                <td>{candidate.email || 'Not provided'}</td>
                <td>{candidate.location || 'Not provided'}</td>
                <td>{candidate.company || 'Not provided'}</td>
                <td>
                  <a href={candidate.html_url ?? ''} target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </td>
                <td>
                  <button className='reject-btn' onClick={() => removeCandidate(candidate.id ?? 0)}>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : (<p>No saved candidates found.</p>)}
        
    </div>
  );
}

export default SavedCandidates;



