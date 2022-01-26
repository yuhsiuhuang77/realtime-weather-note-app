
import { useRoutes } from "react-router-dom";
import Nav from '../../components/Nav'
import Weather from '../Weather';
import Shop from '../Shop';
import Home from '../Home';


const routesConfig = [
    { path: '/', element: <Home /> },
    { path: '/weather', element: <Weather /> },
    { path: '/shop', element: <Shop /> },
]


const App = () => {

    let route = useRoutes(routesConfig);

    return <div className="app">
        <Nav />
        { route }
    </div>
}


export default App