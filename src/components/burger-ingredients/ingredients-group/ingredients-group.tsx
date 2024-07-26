import IngredientCard from '../ingredient-card/ingredient-card';
import { ingredientType } from '../../../utils/burger-api';
import ingridientsGroupStyles from './ingredients-group.module.css'

type IngredientsGroupProps = {
    ingredientsList: ingredientType[];
    groupName: string;
    onIngridientCardClick: (ingredient: ingredientType) => void;
};


export default function IngredientsGroup({ ingredientsList, groupName, onIngridientCardClick }: IngredientsGroupProps) {
    return (
        <li>
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
};
