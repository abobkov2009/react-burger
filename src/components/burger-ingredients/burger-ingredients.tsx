import { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import AlertMessage from '../alert-message/AlertMessage';
import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientDetails from './ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import { useGetIngredientsQuery } from '../../services/api';
import { selectCurrentIngredient, selectIngredientAmounts } from '../../services/selectors';

import burgerIngridientsStyles from './burger-ingredients.module.css';

export default function BurgerIngredients() {
    const { data: ingredientsList, error, isLoading } = useGetIngredientsQuery();

    //const ingredientsByCategories = useSelector(selectIngredientsGroupeByCategoryMergedWithAmounts);
    const currentIngredient = useSelector(selectCurrentIngredient);
    const ingedientsAmounts = useSelector(selectIngredientAmounts);
    
    const ingredientsByCategories = useMemo(()=> {return {
            buns: ingredientsList?.filter(ingredient => ingredient.type === 'bun').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }),
            sauces: ingredientsList?.filter(ingredient => ingredient.type === 'sauce').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }),
            mains: ingredientsList?.filter(ingredient => ingredient.type === 'main').map(ingredient => { return { ...ingredient, amount: ingedientsAmounts[ingredient._id] | 0 } }),        
        }}, [ingredientsList, ingedientsAmounts]
    )
    

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
            {error && (<AlertMessage header="Произошла ошибка при загрузке списка ингредиентов..."/>)}
            {!isLoading && !error && (
                <>
                    <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                    <IngredientsTabs selectedCategory={selectedCategory} onTabClick={handleTabClick} />
                    <ul ref={containerRef} onScroll={handleScroll} className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`} >
                        {ingredientsByCategories.buns && <IngredientsGroup ref={bunsRef} ingredientsList={ingredientsByCategories.buns} groupName='Булки' />}
                        {ingredientsByCategories.sauces && <IngredientsGroup ref={saucesRef} ingredientsList={ingredientsByCategories.sauces} groupName='Соусы' />}
                        {ingredientsByCategories.mains && <IngredientsGroup ref={mainsRef} ingredientsList={ingredientsByCategories.mains} groupName='Начинки' />}
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