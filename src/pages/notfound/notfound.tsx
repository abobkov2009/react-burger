import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import AlertMessage from '../../components/alert-message/AlertMessage';
import styles from './notfound.module.css';

const NotfoundPage = () => {
    const navigate = useNavigate();

    return (
        <main className={`pb-30 ${styles.mainContent}`}>
            <AlertMessage header="Упс... такой страницы не найдено." message="Вернитесь пока на главную страницу" />
            <Button htmlType="button" type='primary' onClick={() => navigate('/')}>Назад на главную</Button>
        </main>
    )
};

export default NotfoundPage;