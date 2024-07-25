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
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
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


    return (
        <div className={appStyles.page}>
            <AppHeader />
            {isLoading && (<AlertMessage header={"Идет загрузка списка ингредиентов"} />)}
            {dataLoadingError && (<AlertMessage header={"Произошла ошибка при загрузке списка ингредиентов..."} message={dataLoadingError} />)}
            {
                !isLoading && (dataLoadingError == null) && (
                    <main className={appStyles.mainContent}>
                        <BurgerIngredients ingredientsList={ingredientsList} setIngredientModalOpen={setIngredientModalOpen} setSelectedIngredient={setSelectedIngredient}  />
                        <BurgerConstructor ingredientsList={ingredientsList} setOrderModalOpen={setOrderModalOpen} />
                    </main>
                )
            }
            {
                isIngredientModalOpen && (selectedIngredient != null) && (
                    <Modal setModalWindowOpen={setIngredientModalOpen}>
                        <IngredientDetails ingredient={selectedIngredient} />
                    </Modal>
                )
            }
            {
                isOrderModalOpen && (
                    <Modal setModalWindowOpen={setOrderModalOpen}>
                        <OrderDetails orderNumber="034536" />
                    </Modal>
                )
            }

        </div>
    )
};