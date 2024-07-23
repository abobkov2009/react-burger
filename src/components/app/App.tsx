import { useEffect, useState } from 'react';
import { ingredientType, orderType } from '../../utils/propTypes';

import AlertMessage from '../alert-message/AlertMessage';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { INGREDIENTS_API_URL } from '../../utils/constants';

import appStyles from './app.module.css'

type ModalContentType = {
    shown:boolean;
    ingredient: typeof ingredientType.prototype | null;
    order: typeof orderType.prototype | null;
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [dataLoadingError, setDataLoadingError] = useState(null);
    const [modalContent, setModalContent] = useState<ModalContentType>({shown:false, ingredient: null, order: null });


    useEffect(() => {
        const loadIngredientsListFromApi = async () => {
            setDataLoadingError(null);
            setIsLoading(true);
            try {
                const response = await fetch(INGREDIENTS_API_URL);
                if (!response.ok) {
                    throw new Error(`Статус ответа: ${response.status}`);
                }
                const ingredientsFromApi = await response.json();
                if (!ingredientsFromApi.success) {
                    throw new Error(`Ответ Api не содержит списка!`);
                }                
                setIngredientsList(ingredientsFromApi.data);
            }
            catch (error: any) {
                setDataLoadingError(error.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        loadIngredientsListFromApi();
    }, []);

    const onIngridientItemClick = (ingredient: typeof ingredientType.prototype) => {
        const content = {
            shown:true,
            ingredient: ingredient,
            order: null,
        }
        setModalContent(content);
    }

    const onOrderSubmit = () => {
        const content = {
            shown:true,
            ingredient: null,
            order: { number: "034536" },
        }
        setModalContent(content);
    }

    const handleCloseModal = () => {
        const content = {
            shown:false,
            ingredient: null,
            order: null,
        }
        setModalContent(content);
    }

    const modalWindow = (        
        <Modal onCloseModalClick={handleCloseModal} buttonPositionTop={modalContent.ingredient ? 48 : 60}>
            <>
                {modalContent.ingredient && (<IngredientDetails ingredient={modalContent.ingredient} />)}
                {modalContent.order && (<OrderDetails order={modalContent.order} />)}
            </>
        </Modal>
    );

    return (
        <div className={appStyles.page}>
            <AppHeader />
            {isLoading && (<AlertMessage header={"Идет загрузка списка ингредиентов"} />)}
            {dataLoadingError && (<AlertMessage header={"Произошла ошибка при загрузке списка ингредиентов..."} message={dataLoadingError} />)}
            {
                !isLoading && (dataLoadingError == null) && (
                    <main className={appStyles.mainContent}>
                        <BurgerIngredients ingredientsList={ingredientsList} onIngridientItemClick={onIngridientItemClick} />
                        <BurgerConstructor ingredientsList={ingredientsList} onOrderSubmit={onOrderSubmit} />
                    </main>
                )
            }
            {modalContent.shown && modalWindow}
        </div>
    )
};