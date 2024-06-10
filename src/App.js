
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/arun007/spotify/SvkqKRJChnyhpVkN/search?q=${keyword===""?"trending":keyword}&type=track`);
    let convertedData = await data.json();
    // console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  }

  useEffect(()=>{
    getTracks();
  },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
           
              <input 
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value) }}
              className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button onClick={getTracks} className="btn btn-outline-success" >Search</button>
           
          </div>
        </div>
      </nav>
      <div className="container">
        <div className={`row ${isLoading ? " ":" d-none"} `}>
          <div className="col-12 py-5">
          <>
  <div
    className="spinner-border"
    style={{ width: "3rem", height: "3rem" }}
    role="status"
  >
    <span className="visually-hidden">Loading...</span>
  </div>

</>

          </div>
        </div>
        </div>
        <div className="row">
          {
            tracks.map((element, index) => {
              return (
                <div key={element.id} className='col-lg-3 col-md-6 py-2 ' >


                  <div className="card" style={{ width: "18rem" }}>
                    <img src={element.album.images[2].url} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">
                        Artist: {element.album.artists[0].name}
                      </p>
                      <p className="card-text">
                        Release date: {element.album.release_date}
                      </p>
                      <audio src={element.preview_url} controls className='w-100'></audio>
                    </div>
                  </div>


                </div>
              )
            })
          }
        </div>
      

    </>
  );
}

export default App;
