import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './ingredient.module.css';

const IngredientPage = () => {
    return (
        <main className={`${styles.mainContent}`}>
            <IngredientDetails />
        </main>
    )
};

export default IngredientPage;