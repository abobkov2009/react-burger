import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';
//import IngredientDetails from './ingredient-details/ingredient-details';
//import Modal from '../modal/modal';
import { ingredientType } from '../../utils/burger-api';
import burgerIngridientsStyles from './burger-ingredients.module.css';
import { showIngredientModalWindow } from '../../services/modal';


type BurgerIngredientsProps = {
    ingredientsList: ingredientType[];
    setSelectedIngredient: (ingredient: ingredientType) => void;
};

export default function BurgerIngredients({ ingredientsList, setSelectedIngredient }: BurgerIngredientsProps) {
    const dispatch = useAppDispatch();

    const [currentCategory, setCurrentCategory] = useState('buns');

    const bunsRef = useRef<HTMLLIElement>(null);
    const saucesRef = useRef<HTMLLIElement>(null);
    const mainsRef = useRef<HTMLLIElement>(null);
    const containerRef = useRef<HTMLUListElement>(null);

    const handleScroll = () => {
        const containerTop = containerRef.current!.getBoundingClientRect().y;
        const bunsOffset = Math.abs(bunsRef.current!.getBoundingClientRect().y - containerTop);
        const sauceOffset = Math.abs(saucesRef.current!.getBoundingClientRect().y - containerTop);
        const mainsOffset = Math.abs(mainsRef.current!.getBoundingClientRect().y - containerTop);

        if (bunsOffset < sauceOffset && bunsOffset < mainsOffset) setCurrentCategory("buns");
        if (sauceOffset < mainsOffset && sauceOffset < bunsOffset) setCurrentCategory("sauces");
        if (mainsOffset < sauceOffset && mainsOffset < bunsOffset) setCurrentCategory("mains");
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

    const onIngridientCardClick = (ingredient: ingredientType) => {
        setSelectedIngredient(ingredient);
        dispatch(showIngredientModalWindow())
    }

    return (
        <section className={`pt-10 ml-5 mr-10 ${burgerIngridientsStyles.container}`}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <IngredientsTabs currentCategory={currentCategory} onTabClick={handleTabClick} />
            <ul ref={containerRef} onScroll={handleScroll} className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`} >
                <IngredientsGroup ref={bunsRef} ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'bun')} groupName='Булки' onIngridientCardClick={onIngridientCardClick} />
                <IngredientsGroup ref={saucesRef} ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'sauce')} groupName='Соусы' onIngridientCardClick={onIngridientCardClick} />
                <IngredientsGroup ref={mainsRef} ingredientsList={ingredientsList.filter((ingredient) => ingredient.type === 'main')} groupName='Начинки' onIngridientCardClick={onIngridientCardClick} />
            </ul>
        </section>
    )
};