import { useMemo, useRef, useState } from 'react';
import { useAppSelector,  } from '../../utils/hooks';

import IngredientsTabs from './ingredients-tabs/ingredients-tabs';
import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientDetails from './ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import burgerIngridientsStyles from './burger-ingredients.module.css';


export default function BurgerIngredients() {
    const isIngredientModalOpen = useAppSelector(state => state.modals.isIngredientModalOpen);
    const ingredientsList = useAppSelector(state => state.ingredients.ingredientsList);

	const bunsList = useMemo(() => ingredientsList.filter((ingredient) => ingredient.type === 'bun'), [ingredientsList]);
	const saucesList = useMemo(() => ingredientsList.filter((ingredient) => ingredient.type === 'sauce'), [ingredientsList]);
    const mainsList = useMemo(() => ingredientsList.filter((ingredient) => ingredient.type === 'main'), [ingredientsList]);
	

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
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <IngredientsTabs selectedCategory={selectedCategory} onTabClick={handleTabClick} />
            <ul ref={containerRef} onScroll={handleScroll} className={`custom-scroll ${burgerIngridientsStyles.scrollableList}`} >
                <IngredientsGroup ref={bunsRef} ingredientsList={bunsList} groupName='Булки' />
                <IngredientsGroup ref={saucesRef} ingredientsList={saucesList} groupName='Соусы' />
                <IngredientsGroup ref={mainsRef} ingredientsList={mainsList} groupName='Начинки' />
            </ul>
            {
                isIngredientModalOpen && (
                    <Modal>
                        <IngredientDetails />
                    </Modal>
                )
            }
        </section>
    )
};