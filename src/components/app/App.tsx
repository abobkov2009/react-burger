import { useEffect } from 'react';

import AlertMessage from '../alert-message/AlertMessage';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { loadIngredients } from '../../utils/burger-api';
//import { useGetIngredientsQuery } from '../../utils/api';

import appStyles from './app.module.css'


export default function App() {
    //const { data, error, isLoading } = useGetIngredientsQuery();
    const dispatch = useAppDispatch();

    const ingredientsRequested = useAppSelector(state => state.ingredients.ingredientsRequested);
    const ingredientsFailed = useAppSelector(state => state.ingredients.ingredientsFailed);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);


    return (
        <div className={appStyles.page}>
            <AppHeader />
            {ingredientsRequested && (<AlertMessage header={"Идет загрузка списка ингредиентов"} />)}
            {ingredientsFailed && (<AlertMessage header={"Произошла ошибка при загрузке списка ингредиентов..."} />)}
            {!ingredientsRequested && !ingredientsFailed && (
                    <main className={appStyles.mainContent}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
                )
            }
        </div>
    )
};