import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRegisterUserMutation } from '../../services/auth';
import { useFetchUserData } from '../../utils/hooks';
import { saveTokensToLocalStorage } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/ErrorMessage';

import styles from './register.module.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { data: userInfo } = useFetchUserData();
    const [registerUserTriger, { isLoading }] = useRegisterUserMutation();

    const [form, setFormValue] = useState({ name: '', email: '', password: '' });
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({ ...form, [e.target.name]: e.target.value });
    }
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((form.name?.length !== 0) && (form.email?.length !== 0) && (form.password?.length !== 0)) {
                const registerResult = await registerUserTriger(form).unwrap();
                if (registerResult.success && registerResult.accessToken && registerResult.refreshToken && registerResult.user) {
                    saveTokensToLocalStorage(registerResult.accessToken, registerResult.refreshToken);
                    navigate(location?.state?.from || URLS.PROFILE);
                } else {
                    setErrorMessage(registerResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            let message = 'Неизвестная ошибка';
            if (err && typeof err === 'object' && 'data' in err) {
                message = (err as { status: Number, data: { success: boolean; message: string; } }).data.message;
            }
            setErrorMessage(message);
        }
    }

    if (userInfo) {
        return (
            <Navigate to={URLS.HOMEPAGE} replace />
        )
    }

    return (
        <main className={styles.mainContent}>
            <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <Input type='text' name='name' value={form.name ?? ""} placeholder='Имя' onChange={onChange} required extraClass='mb-6' />
                <EmailInput name='email' value={form.email ?? ""} onChange={onChange} required extraClass='mb-6' />
                <PasswordInput name='password' value={form.password ?? ""} onChange={onChange} required extraClass='mb-6' />
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