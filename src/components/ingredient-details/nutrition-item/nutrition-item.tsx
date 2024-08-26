import nutritionItemStyles from './nutrition-item.module.css';

type TNutritionItemProps = {
    caption: string;
    value: number;
};

const NutritionItem: React.FC<TNutritionItemProps> = ({ caption, value }) => {
    return (
        <div className={nutritionItemStyles.container}>
            <div className="text text_type_main-small text_color_inactive mb-2">{caption}</div>
            <div className="text text_type_digits-default text_color_inactive">{value}</div>
        </div>
    )
};

export default NutritionItem;