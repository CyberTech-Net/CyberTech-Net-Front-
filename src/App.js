import './App.css';
import Navigation from './components/sidebar/Navigation.tsx';
import Footer from './components/footer/Footer.tsx';
import Header from './components/header/Header.tsx';
import Main from './components/main/Main.tsx';

function App() {
  return (
    <body className="App">
        <Header />
        <div className="middleSection">
          <Navigation />
          <Main/>
        </div>
        <Footer/>
    </body>
  );
}
 
export default App;
