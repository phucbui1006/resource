import{BrowserRouter, Routes, Route} from 'react-router-dom';
import{Container} from 'react-bootstrap';
import Listproduct from './components/Listproduct';
import Addproduct from './components/Addproduct';
import Editproduct from './components/Editproduct';

function App() {
    return (
       <BrowserRouter>
         <Container>
           <Routes>
             <Route path="/" element={<Listproduct />} />
             <Route path="/add" element={<Addproduct />} />
             <Route path="/edit/:id" element={<Editproduct />} />
           </Routes>
         </Container>
       </BrowserRouter>
    )
}

export default App;