import PropTypes, { InferProps } from 'prop-types';

import headerItemStyles from './header-item.module.css'

HeaderItem.propTypes = {
    icon: PropTypes.element.isRequired,
    caption: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};

export default function HeaderItem({ icon, caption, isActive = true }: InferProps<typeof HeaderItem.propTypes>) {
    const captionClassName = isActive ? "" : "text_color_inactive";
    return (
        <div className={`pl-5 pr-5 pt-4 pb-4 ${headerItemStyles.navitem}`}>
            {icon}
            <p className={`ml-2 text text_type_main-default ${captionClassName}`}>
                {caption}
            </p>
        </div>
    )
};
