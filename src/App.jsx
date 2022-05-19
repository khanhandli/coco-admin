import React from 'react';
import { useStore } from './hooks/useStore';
import RouterList from './routes';
import RouterListAdmin from './routes/adminRouter';
function App() {
    const [token, setToken] = useStore && useStore()?.token;
    const [user, setUser] = useStore && useStore()?.user;

    return <div>{token && user?.role === 1 ? <RouterList /> : <RouterListAdmin />}</div>;
}

export default App;
