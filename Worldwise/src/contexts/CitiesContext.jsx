import { createContext , useContext,useState,useEffect} from "react";
const BASE_URL ="http://localhost:9000/cities";
import PropTypes from 'prop-types';
const CitiesContext =createContext();
function CitiesProvider({children}){
    const [cities,setCities]= useState([]);
    const [isloading,setIsLoading]=useState(false);
    const [currentCity,setCurrentCity]=useState({});
    useEffect (function(){
      async function fetchCities(){
        try{
          setIsLoading(true);
        const res= await fetch (`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
      }
      catch{
        alert("There was an error loading data...")}
      finally{setIsLoading(false)}
    }
      fetchCities();
    },[]);

    async function getCity(id){
        try{
          setIsLoading(true);
          const res= await fetch (`${BASE_URL}/${id}`);
          const data = await res.json();
          setCurrentCity(data);
      }
      catch{ alert("There was an error loading data...");}
      finally{setIsLoading(false);}
    }
    async function createCity(newCity){
      try{
        setIsLoading(true);
        const res= await fetch (`${BASE_URL}`,{ 
        method :'POST',
        body:JSON.stringify(newCity),
      headers:{"Content-Type":"application/json",}
    });
        const data = await res.json();
    setCities ((cities)=> [...cities,data]);
    }
    catch{ alert("There was an error loading data...");}
    finally{setIsLoading(false);}
  }
    
    return ( 
    <CitiesContext.Provider  value={{cities,isloading,currentCity,getCity,createCity}}> {children}</CitiesContext.Provider>)
  }

CitiesProvider.propTypes = {
    children: PropTypes.any // Add the missing prop type validation
    // Add the missing prop type validation
  };
  function useCities(){
    const context =useContext(CitiesContext);
    if(context ===undefined)
    throw new Error ("CitiesContext was used outside the CitiesProvider");
  return context;
  }

export {CitiesProvider,useCities};