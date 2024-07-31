import { forwardRef } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientType } from '../../../utils/burger-api';
import ingridientsGroupStyles from './ingredients-group.module.css'


type IngredientsGroupProps = {
    ingredientsList: ingredientType[];
    groupName: string;
    onIngridientCardClick: (ingredient: ingredientType) => void;
};

export type Ref = HTMLLIElement;

export const IngredientsGroup = forwardRef<Ref, IngredientsGroupProps>(({ingredientsList, groupName, onIngridientCardClick},ref) => {
    return (
        <li ref={ref}>
            <h2 className="text text_type_main-medium mb-6">{groupName}</h2>
            <div className={`ml-4 mr-4 ${ingridientsGroupStyles.groupitems}`}>
                {ingredientsList.map((ingredient, index) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                        counter_value={index}
                        onClick={onIngridientCardClick}
                    />
                ))
                }
            </div>
        </li>
    )
});

export default IngredientsGroup;
