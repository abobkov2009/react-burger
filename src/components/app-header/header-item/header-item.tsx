import headerItemStyles from './header-item.module.css'

type HeaderItemProps = {
    icon: React.ReactElement,
    caption: string;
    url: string;
    isActive?: boolean;
};

export default function HeaderItem({ icon, caption, url, isActive = true }: HeaderItemProps) {
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
