import { useEffect, useState } from 'react';

import AlertMessage from '../alert-message/AlertMessage';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { ingredientType, getIngredients } from '../../utils/burger-api';

import appStyles from './app.module.css'


export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [dataLoadingError, setDataLoadingError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<ingredientType | null>(null);


    useEffect(() => {
        setDataLoadingError(null);
        setIsLoading(true);

        getIngredients()
            .then((result: any) => {
                setIngredientsList(result.data)
            })
            .catch((error: any) => {
                setDataLoadingError(error.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    const onIngridientCardClick = (ingredient: ingredientType) => {
        setSelectedIngredient(ingredient);
        setIsModalOpen(true);
    }

    const onOrderSubmitButtonClick = () => {
        setSelectedIngredient(null);
        setIsModalOpen(true);
    }

    return (
        <div className={appStyles.page}>
            <AppHeader />
            {isLoading && (<AlertMessage header={"Идет загрузка списка ингредиентов"} />)}
            {dataLoadingError && (<AlertMessage header={"Произошла ошибка при загрузке списка ингредиентов..."} message={dataLoadingError} />)}
            {
                !isLoading && (dataLoadingError == null) && (
                    <main className={appStyles.mainContent}>
                        <BurgerIngredients ingredientsList={ingredientsList} onIngridientCardClick={onIngridientCardClick} />
                        <BurgerConstructor ingredientsList={ingredientsList} onOrderSubmitButtonClick={onOrderSubmitButtonClick} />
                    </main>
                )
            }
            {
                isModalOpen && (
                    <Modal setIsModalOpen={setIsModalOpen} buttonPositionTop={selectedIngredient ? 48 : 60}>
                        {selectedIngredient
                            ? (<IngredientDetails ingredient={selectedIngredient} />)
                            : (<OrderDetails orderNumber="034536" />)
                        }
                    </Modal>
                )
            }
        </div>
    )
};