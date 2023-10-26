import styles from './Button.module.css'
import PropTypes from 'prop-types';
function Button({children,onClick,type}) {
    return (
       < button onClick={onClick} className={`${styles.btn}${styles[type]}`}>
         {children} 
         </button>
    );
}
Button.propTypes = {
    children: PropTypes.any.isRequired, // Add the missing prop type validation
    onClick: PropTypes.any ,// Add the missing prop type validation
    type: PropTypes.string // Add the missing prop type validation
  };

export default Button;
