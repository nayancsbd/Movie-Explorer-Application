import { useState } from 'react';
import { Layout } from './components';
import { Home } from './pages';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <Home searchTerm={searchTerm} onClearSearch={() => setSearchTerm('')} />
    </Layout>
  );
}

export default App;
