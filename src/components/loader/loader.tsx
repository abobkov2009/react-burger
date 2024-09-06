import rollingImage from '../../images/rolling.svg'
import styles from './loader.module.css'
type TLoaderProps = {
    message?: string;
};

export default function Loader({ message }: TLoaderProps): React.JSX.Element {
    return (
        <div className={`${styles.container} p-10`}>
            <img src={rollingImage} alt={message} />
            {message && (<div className="text text_type_main-default mt-5 ml-5">{message}</div>)}
        </div>
    )
};

