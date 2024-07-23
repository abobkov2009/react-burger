import PropTypes, { InferProps } from 'prop-types';

import nutritionItemStyles from './nutrition-item.module.css';

NutritionItem.propTypes = {
    caption: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default function NutritionItem({ caption, value }: InferProps<typeof NutritionItem.propTypes>) {
    return (
        <div className={nutritionItemStyles.container}>
            <div className="text text_type_main-small text_color_inactive mb-2">{caption}</div>
            <div className="text text_type_digits-default text_color_inactive">{value}</div>
        </div>
    )
};