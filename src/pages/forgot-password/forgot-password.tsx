import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useRequestPasswordResetMutation } from '../../services/auth';
import { authErrorType } from '../../services/types';
import { setPasswordResetRequested } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/ErrorMessage';

import styles from './forgot-password.module.css';


export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [resetPasswordTriger] = useRequestPasswordResetMutation();

    const [email, setEmail] = useState('');
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (email.length !== 0) {
                const resetResult = await resetPasswordTriger({ email }).unwrap();
                if (resetResult.success) {
                    setPasswordResetRequested();
                    navigate(URLS.RESET_PASSWORD);
                } else {
                    setErrorMessage(resetResult.message ?? 'Неизвестная ошибка');
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

    return (
        <main className={styles.mainContent}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <EmailInput name='email' value={email ?? ""} onChange={onEmailChange} placeholder='Укажите e-mail' required extraClass='mb-6' />
                <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Восстановить</Button>
            </form>
            <div className={`mb-4 ${styles.flexrow}`}>
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</p>
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