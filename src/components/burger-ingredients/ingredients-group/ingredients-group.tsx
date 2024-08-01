import { forwardRef } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientType } from '../../../utils/burger-api';
import ingridientsGroupStyles from './ingredients-group.module.css'

type ingredientWithAmountType = ingredientType & { amount: number }

type IngredientsGroupProps = {
    ingredientsList: ingredientWithAmountType[];
    groupName: string;
};

export type Ref = HTMLLIElement;

export const IngredientsGroup = forwardRef<Ref, IngredientsGroupProps>(({ ingredientsList, groupName }, ref) => {
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
