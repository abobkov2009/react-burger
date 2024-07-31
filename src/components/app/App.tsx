import { useEffect, useState } from 'react';

import AlertMessage from '../alert-message/AlertMessage';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { ingredientType, getIngredients } from '../../utils/burger-api';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import appStyles from './app.module.css'


export default function App() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [dataLoadingError, setDataLoadingError] = useState(null);

    const isIngredientModalOpen = useAppSelector(state => state.modalState.isIngredientModalOpen);
    const [selectedIngredient, setSelectedIngredient] = useState<ingredientType | null>(null);
    const isOrderModalOpen = useAppSelector(state => state.modalState.isOrderDetailsModalOpen);    
    


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
                        <BurgerIngredients ingredientsList={ingredientsList} setSelectedIngredient={setSelectedIngredient} />
                        <BurgerConstructor ingredientsList={ingredientsList} />
                    </main>
                )
            }
            {
                isIngredientModalOpen && (selectedIngredient != null) && (
                <Modal>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
                )
            }
            {
                isOrderModalOpen && (
                    <Modal>
                        <OrderDetails orderNumber="034536" />
                    </Modal>
                )
            }

        </div>
    )
};