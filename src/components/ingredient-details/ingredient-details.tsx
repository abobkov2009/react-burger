import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useGetIngredientsQuery } from '../../services/ingredients';
import AlertMessage from '../alert-message/AlertMessage';
import NutritionItem from './nutrition-item/nutrition-item';

import ingredientDetailStyles from './ingredient-details.module.css';

export default function IngredientDetails(): React.JSX.Element {
    const navigate = useNavigate();
    const { ingredient_id } = useParams<{ ingredient_id: string }>();
    const { data: ingredientsList, error, isLoading } = useGetIngredientsQuery();

    const ingredient = useMemo(
        () => ingredientsList?.find((ingredient) => ingredient._id === ingredient_id)
        , [ingredientsList, ingredient_id]
    );


    return (
        <>
            {isLoading && (<AlertMessage header="Идет загрузка списка ингредиентов" />)}
            {error && (<AlertMessage header="Произошла ошибка при загрузке списка ингредиентов..." />)}
            {!isLoading && !error && !ingredient && (
                <>
                    <AlertMessage header="Такого ингредиента к нам пока не завезли..." />
                    <Button htmlType="button" type='primary' onClick={() => navigate('/')}>Назад на главную</Button>
                </>
            )}
            {!isLoading && !error && ingredient && (
                <div className={`pt-10 ${ingredientDetailStyles.container}`}>
                    <div className={`pl-10 pr-10 text text_type_main-large ${ingredientDetailStyles.ingredientTitle}`}>Детали ингредиента</div>
                    <img className={`pb-4 ${ingredientDetailStyles.image}`} src={ingredient!.image_large} alt={ingredient!.name} />
                    <div className={`pb-8 text text_type_main-medium ${ingredientDetailStyles.ingredientName}`} data-testid="ingredient-details-name">{ingredient!.name}</div>
                    <div className={`pb-15 text text_type_main-default text_color_inactive ${ingredientDetailStyles.nutritionDetails}`}>
                        <NutritionItem caption='Калории,ккал' value={ingredient!.calories} />
                        <NutritionItem caption='Белки, г' value={ingredient!.proteins} />
                        <NutritionItem caption='Жиры, г' value={ingredient!.fat} />
                        <NutritionItem caption='Углеводы, г' value={ingredient!.carbohydrates} />
                    </div>
                </div>
            )}
        </>
    )
};
