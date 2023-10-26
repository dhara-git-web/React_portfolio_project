import PropTypes from 'prop-types';
import styles from './Cityitem.module.css'
import { Link } from 'react-router-dom';
const formDate=(date) =>
new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:"long",
    year:"numeric"
}).format(new Date(date));

function Cityitem({city}) {
    const {cityName,emoji,date,id,countryEmoji,position}=city;
    console.log(city);
    console.log(position);
    return (
        <li>
<Link className={styles.cityItem } to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
<span className={styles.emoji}>{emoji||countryEmoji}</span>
<h3  className={styles.name}>{cityName}</h3>
<time  className={styles.date}>{formDate(date)}</time>
<button className={styles.deleteBtn}>&times;</button>
</Link>
        </li>
    );
}
Cityitem.propTypes = {
    city: PropTypes.object.isRequired, // Add the missing prop type validation
    // Add the missing prop type validation
  };

export default Cityitem;
