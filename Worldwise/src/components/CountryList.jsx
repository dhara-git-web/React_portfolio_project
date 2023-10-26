import Spinner from './Spinner';
import PropTypes from 'prop-types';
import styles from './CountryList.module.css';
import Message from"./Message"
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const {cities,isLoading}=useCities();
    if(isLoading)return (<Spinner/>);
    if (!cities.length) return (<Message message ="Add your first city by clicking on a city on th map" />);

    const Countries=cities.reduce((arr,city)=> 
     {if(!arr.map((el)=>el.country).includes(city.country))
    return[...arr,{country:city.country,emoji:city.emoji}]
    else return arr;}
    ,[])
    return (
        <ul className={styles.countryList} >
      {Countries.map((country)=> (<CountryItem  country={country} key={country.country}/>))}
        </ul>
    );
}
CountryList.propTypes = {
    cities: PropTypes.array, // Add the missing prop type validation
    isLoading: PropTypes.any // Add the missing prop type validation
  };


export default CountryList; 
