import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRegisterUserMutation } from '../../services/auth';
import { useForm } from '../../hooks';
import { TAuthError } from '../../services/types';
import { saveTokensToLocalStorage } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/ErrorMessage';

import styles from './register.module.css';

interface TFormValues {
    name: string;
    email: string;
    password: string;
}


const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [registerUserTriger, { isLoading }] = useRegisterUserMutation();

    const { formValues, handleFormChange } = useForm<TFormValues>({ name: '', email: '', password: '' });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((formValues.name.length !== 0) && (formValues.email?.length !== 0) && (formValues.password?.length !== 0)) {
                const registerResult = await registerUserTriger(formValues).unwrap();
                if (registerResult.success && registerResult.accessToken && registerResult.refreshToken && registerResult.user) {
                    saveTokensToLocalStorage(registerResult.accessToken, registerResult.refreshToken);
                    navigate(location?.state?.from || URLS.PROFILE);
                } else {
                    setErrorMessage(registerResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            setErrorMessage((err && typeof err === 'object' && 'data' in err) ? (err as TAuthError).data.message : 'Неизвестная ошибка');
        }
    }

    return (
        <main className={styles.mainContent}>
            <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <Input type='text' name='name' value={formValues.name ?? ""} placeholder='Имя' onChange={handleFormChange} required extraClass='mb-6' />
                <EmailInput name='email' value={formValues.email ?? ""} onChange={handleFormChange} required extraClass='mb-6' />
                <PasswordInput name='password' value={formValues.password ?? ""} onChange={handleFormChange} required extraClass='mb-6' />
                <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20' disabled={isLoading} >Зарегистрироваться</Button>
            </form>
            <div className={`mb-4 ${styles.flexrow}`}>
                <p className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?</p>
                <Link to={URLS.LOGIN} className={`text text_type_main-default ${styles.link}`}>Войти</Link>
            </div>
            {errorMessage && (
                <Modal onModalClose={() => setErrorMessage(null)}>
                    <ErrorMessage errorMessage={errorMessage} />
                </Modal>
            )}
        </main>
    )
};

export default RegisterPage;