import PropTypes, { InferProps } from 'prop-types';
import { ingredientType } from '../../../utils/propTypes';
import IngredientCard from '../ingredient-card/ingredient-card';

import ingridientsGroupStyles from './ingredients-group.module.css'

IngredientsGroup.propTypes = {
    ingredientsList: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    groupName: PropTypes.string.isRequired,
    onIngridientItemClick: PropTypes.func.isRequired
};


export default function IngredientsGroup({ ingredientsList, groupName, onIngridientItemClick }: InferProps<typeof IngredientsGroup.propTypes>) {
    return (
        <li>
            <h2 className="text text_type_main-medium mb-6">{groupName}</h2>
            <div className={`ml-4 mr-4 ${ingridientsGroupStyles.groupitems}`}>
                {ingredientsList.map((ingredient, index) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                        counter_value={index}
                        onIngredientClick={onIngridientItemClick}
                    />
                ))
                }
            </div>
        </li>
    )
};
