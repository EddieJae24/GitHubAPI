
const key = import.meta.env.VITE_GITHUB_TOKEN;

const searchGithub = async () => {
  try {
    
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Start:', start);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );
    console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log('an error occurred', err);
    return [];
  }
};


if (!key) {
  console.error('GitHub token is missing. Please check your .env file.');
  throw new Error('Unauthorized: Missing GitHub token.');
}

const searchGithubUser = async (username: string) => {
 
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${key}`, 
      },
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`GitHUb API Error: ${response.status} ${response.statusText}`);
    }
    return data;

  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw error;
  }
};

export { searchGithub, searchGithubUser };
