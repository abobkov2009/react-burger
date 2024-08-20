import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useLoginUserMutation } from '../../services/auth';
import { useFetchUserData } from '../../utils/hooks';
import { authErrorType } from '../../services/types';
import { saveTokensToLocalStorage } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/ErrorMessage';

import styles from './login.module.css';


export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: userInfo, isLoading } = useFetchUserData();

    const [loginUserTriger] = useLoginUserMutation();

    const [form, setFormValue] = useState({ email: '', password: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    }

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((form.email?.length !== 0) && (form.password?.length !== 0)) {
                const loginResult = await loginUserTriger(form).unwrap();
                if (loginResult.success && loginResult.accessToken && loginResult.refreshToken) {
                    saveTokensToLocalStorage(loginResult.accessToken, loginResult.refreshToken);
                    navigate(location?.state?.from || URLS.PROFILE, { replace: true });
                } else {
                    setErrorMessage(loginResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            let message = 'Неизвестная ошибка';
            if (err && typeof err === 'object' && 'data' in err) {
                message = (err as authErrorType).data.message;
            }
            setErrorMessage(message);
        }
    }

    if (isLoading) {
        return null;
    }

    if (userInfo) {
        return (
            <Navigate
                to={location?.state?.from || URLS.PROFILE}
                replace={true}
            />
        )
    }

    return (
        <main className={styles.mainContent}>
            <h2 className='text text_type_main-medium mb-6'>Вход</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <EmailInput name='email' value={form.email ?? ''} onChange={onChange} required extraClass='mb-6' />
                <PasswordInput name='password' value={form.password ?? ''} onChange={onChange} required extraClass='mb-6' />
                <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Войти</Button>
            </form>
            <div className={`mb-4 ${styles.flexrow}`}>
                <p className={'text text_type_main-default text_color_inactive'}>Вы новый пользователь?</p>
                <Link to={URLS.REGISTER} className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
            </div>
            <div className={`${styles.flexrow}`}>
                <p className={'text text_type_main-default text_color_inactive'}>Забыли пароль?</p>
                <Link to={URLS.FORGOT_PASSWORD} className={`text text_type_main-default ${styles.link}`}>Восстановить пароль</Link>
            </div>
            {errorMessage && (
                <Modal onModalClose={() => setErrorMessage(null)}>
                    <ErrorMessage errorMessage={errorMessage} />
                </Modal>
            )}
        </main>
    )
};