import Spinner from './Spinner';
import PropTypes from 'prop-types';
import styles from './cityList.module.css';
import Cityitem from './Cityitem';
import { useCities } from '../contexts/CitiesContext';

function CityList() {
const {cities,isLoading}=useCities();
    if(isLoading)return (<Spinner/>);
   { /*if (!cities.length) return (<Message message ="Add your first city by clicking on a city on th map" />);*/}
  
    return (
    
        <ul className={styles.cityList} >
         
          {cities.map((city)=> < Cityitem city={city} key={city.id}/>)}
        </ul>
    )
}


CityList.propTypes = {
  cities: PropTypes.array,// Add the missing prop type validation
  isLoading: PropTypes.any // Add the missing prop type validation
};
export default CityList; 
