import PropTypes, { InferProps } from 'prop-types';

import headerItemStyles from './header-item.module.css'

HeaderItem.propTypes = {
    icon: PropTypes.element.isRequired,
    caption: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
};

export default function HeaderItem({ icon, caption, url, isActive = true }: InferProps<typeof HeaderItem.propTypes>) {
    const captionClassName = isActive ? `${headerItemStyles.caption}` : "text_color_inactive";
    return (
        <a className={`pl-5 pr-5 pt-4 pb-4 ${headerItemStyles.navitem}`} href={url}>
            {icon}
            <p className={`ml-2 text text_type_main-default ${captionClassName}`}>
                {caption}
            </p>
        </a>
    )
};
