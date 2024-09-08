import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { useConfirmPasswordResetMutation } from '../../services/auth';
import { useForm } from '../../hooks';
import { TAuthError } from '../../services/types';
import { isPasswordResetRequested, clearPasswordResetRequested } from '../../utils/local-storage';
import { URLS } from '../../utils/constants';
import Modal from '../../components/modal/modal';
import ErrorMessage from '../../components/error-message/ErrorMessage';

import styles from './reset-password.module.css';


interface TFormValues {
    password: string;
    token: string;
}

export default function ResetPasswordPage(): React.JSX.Element {
    const navigate = useNavigate();

    const [confirmResetTriger] = useConfirmPasswordResetMutation();

    const { formValues, handleFormChange } = useForm<TFormValues>({ password: '', token: '' });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formValues.password.length !== 0 && formValues.token.length !== 0) {
                const resetResult = await confirmResetTriger(formValues).unwrap();
                if (resetResult.success) {
                    clearPasswordResetRequested();
                    navigate(URLS.LOGIN, { replace: true });
                } else {
                    setErrorMessage(resetResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            setErrorMessage((err && typeof err === 'object' && 'data' in err) ? (err as TAuthError).data.message : 'Неизвестная ошибка');
        }
    };

    useEffect(() => {
        if (!isPasswordResetRequested()) {
            navigate(URLS.FORGOT_PASSWORD, { replace: true });
        }
    }, [navigate]);

    return (
        <main className={styles.mainContent}>
            <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
                <PasswordInput name='password' value={formValues.password ?? ""} placeholder='Введите новый пароль' onChange={handleFormChange} required extraClass='mb-6' />
                <Input type='text' name='token' value={formValues.token ?? ""} placeholder='Введите код из письма' onChange={handleFormChange} extraClass='mb-6' />
                <Button htmlType='submit' type='primary' size='medium' extraClass='mb-20'>Сохранить</Button>
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

