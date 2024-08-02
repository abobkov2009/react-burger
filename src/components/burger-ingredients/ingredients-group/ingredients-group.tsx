import { forwardRef } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientWithAmountType } from '../../../services/types';
import ingridientsGroupStyles from './ingredients-group.module.css'

type IngredientsGroupProps = {
    ingredientsList: ingredientWithAmountType[];
    groupName: string;
};

export const IngredientsGroup = forwardRef<HTMLLIElement, IngredientsGroupProps>(({ ingredientsList, groupName }, ref) => {
    return (
        <li ref={ref}>
            <h2 className="text text_type_main-medium mb-6">{groupName}</h2>
            <div className={`ml-4 mr-4 ${ingridientsGroupStyles.groupitems}`}>
                {ingredientsList.map((ingredient) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                ))
                }
            </div>
        </li>
    )
});

export default IngredientsGroup;
