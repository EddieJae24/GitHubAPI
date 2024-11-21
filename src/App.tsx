// import { Outlet } from 'react-router-dom';
// import Nav from './components/Nav';

// function App() {
//   return (
//     <>
//       <Nav />
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default App;



import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <Nav />
      <main>
        <h1>Candidate Management</h1>
        
        {/* Candidate Search */}
        <CandidateSearch />
        
        {/* Saved Candidates List */}
        <SavedCandidates />
        
        {/* Error Page in case of failure */}
        <ErrorPage />
      </main>
    </div>
  );
}

export default App;
