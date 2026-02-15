import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import Collab from './pages/Collab';
import Blog from './pages/Blog';
import Media from './pages/Media';
import Podcast from './pages/Podcast';
import Contact from './pages/Contact';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app" style={{ backgroundColor: '#05060a' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/store" element={<Store />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/media" element={<Media />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
