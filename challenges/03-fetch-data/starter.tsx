import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  return (
    <div>
      <h1>Users</h1>
      {/* Show "Loading..." while fetching */}
      {/* Show error message if fetch fails */}
      {/* Render list of user names on success */}
      {/* Include a Retry button */}
    </div>
  );
}

export default App;
