import { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useGetIngredientsQuery } from '../../services/api';

import AlertMessage from '../alert-message/AlertMessage';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientDetails from './ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import burgerIngridientsStyles from './burger-ingredients.module.css';


export default function BurgerIngredients() {
    const { data: ingredientsList, error, isLoading } = useGetIngredientsQuery();

    const { ingredientsInOrder, currentIngredient } = useAppSelector(state => state.ingredients);

    const ingedientsAmounts = useMemo(() => {
        const amounts: { [id: string]: number } = {};
        ingredientsInOrder.stuffing.reduce((acc, ingredient) => {
            acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
            return acc;
        }, amounts);

        if (ingredientsInOrder.bun) amounts[ingredientsInOrder.bun._id] = 2;
        return amounts;
    }, [ingredientsInOrder]);

    const bunsList = useMemo(() => ingredientsList?.filter(ingredient => ingredient.type === 'bun').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }), [ingredientsList, ingedientsAmounts]);
    const saucesList = useMemo(() => ingredientsList?.filter(ingredient => ingredient.type === 'sauce').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }), [ingredientsList, ingedientsAmounts]);
    const mainsList = useMemo(() => ingredientsList?.filter(ingredient => ingredient.type === 'main').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }), [ingredientsList, ingedientsAmounts]);

    const [selectedCategory, setSelectedCategory] = useState('buns');

    const bunsRef = useRef<HTMLLIElement>(null);
    const saucesRef = useRef<HTMLLIElement>(null);
    const mainsRef = useRef<HTMLLIElement>(null);
    const containerRef = useRef<HTMLUListElement>(null);

    const handleScroll = () => {
        const containerTop = containerRef.current!.getBoundingClientRect().y;
        const bunsDistance = Math.abs(bunsRef.current!.getBoundingClientRect().y - containerTop);
        const saucesDistance = Math.abs(saucesRef.current!.getBoundingClientRect().y - containerTop);
        const mainsDistance = Math.abs(mainsRef.current!.getBoundingClientRect().y - containerTop);

        if (bunsDistance < saucesDistance && bunsDistance < mainsDistance) setSelectedCategory("buns");
        if (saucesDistance < mainsDistance && saucesDistance < bunsDistance) setSelectedCategory("sauces");
        if (mainsDistance < saucesDistance && mainsDistance < bunsDistance) setSelectedCategory("mains");
    }

    const handleTabClick = (value: string) => {
        switch (value) {
            case 'buns': {
                bunsRef.current!.scrollIntoView({ block: 'start', behavior: 'smooth' });
                break;
            }
            case 'sauces': {
                saucesRef.current!.scrollIntoView({ block: 'start', behavior: 'smooth' });
                break;
            }
            case 'mains': {
                mainsRef.current!.scrollIntoView({ block: 'start', behavior: 'smooth' });
                break;
            }
        }
    };

    return (
        <section className={`pt-10 ml-5 mr-10 ${burgerIngridientsStyles.container}`}>
            {isLoading && (<AlertMessage header="Идет загрузка списка ингредиентов" />)}
            {error && (<AlertMessage header="Произошла ошибка при загрузке списка ингредиентов..." message={('data' in error) ? JSON.stringify(error.data) : 'Неизвестная ошибка'} />)}
            {!isLoading && !error && (
                <>
                    <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                    <IngredientsTabs selectedCategory={selectedCategory} onTabClick={handleTabClick} />
                    <ul ref={containerRef} onScroll={handleScroll} className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`} >
                        {bunsList && <IngredientsGroup ref={bunsRef} ingredientsList={bunsList} groupName='Булки' />}
                        {saucesList && <IngredientsGroup ref={saucesRef} ingredientsList={saucesList} groupName='Соусы' />}
                        {mainsList && <IngredientsGroup ref={mainsRef} ingredientsList={mainsList} groupName='Начинки' />}
                    </ul>
                </>)
            }
            {currentIngredient && (
                <Modal>
                    <IngredientDetails />
                </Modal>)
            }
        </section>
    )
};