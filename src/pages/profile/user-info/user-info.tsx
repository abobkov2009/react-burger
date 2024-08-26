import { useEffect, useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { useUpdateUserInfoMutation } from '../../../services/auth';
import { useFetchUserData, useForm } from '../../../hooks';
import { TAuthError } from '../../../services/types';
import Modal from '../../../components/modal/modal';
import ErrorMessage from '../../../components/error-message/ErrorMessage';
import styles from './user-info.module.css';

interface TFormValues {
    name: string;
    email: string;
    password: string;
}


const UserInfoPage = () => {
    const { data: userInfo } = useFetchUserData();
    const [updateUserTrigger] = useUpdateUserInfoMutation();

    const { formValues, valuesWasChanged, handleFormChange, setFormValues } = useForm<TFormValues>({ name: '', email: '', password: '' });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (userInfo) {
            setFormValues({ name: userInfo.name, email: userInfo.email, password: '' })
        }
    }, [userInfo, setFormValues])


    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if ((formValues.name.length !== 0) && (formValues.email.length !== 0) && (formValues.password.length !== 0)) {
                const updateResult = await updateUserTrigger(formValues).unwrap();
                if (!updateResult.success) {
                    setErrorMessage(updateResult.message ?? 'Неизвестная ошибка');
                }
            }
        }
        catch (err) {
            setErrorMessage((err && typeof err === 'object' && 'data' in err) ? (err as TAuthError).data.message : 'Неизвестная ошибка');
        }
    }


    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo) {
            setFormValues({ name: userInfo.name, email: userInfo.email, password: '' })
        }
    }

    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <Input type='text' name='name' placeholder='Имя' icon={'EditIcon'} value={formValues.name ?? ''} onChange={handleFormChange} required extraClass='mb-6' />
            <Input type='email' name='email' placeholder='Логин' icon={'EditIcon'} value={formValues.email ?? ''} onChange={handleFormChange} required extraClass='mb-6' />
            <Input type='password' name='password' placeholder='Пароль' icon={'EditIcon'} value={formValues.password ?? ''} onChange={handleFormChange} required extraClass='mb-6' />
            {
                valuesWasChanged && (
                    <div className={styles.buttons}>
                        <Button htmlType='button' type='secondary' size='medium' onClick={handleCancel}>Отмена</Button>
                        <Button htmlType='submit' type='primary' size='medium' >Сохранить</Button>
                    </div>
                )
            }
            {errorMessage && (
                <Modal onModalClose={() => setErrorMessage(null)}>
                    <ErrorMessage errorMessage={errorMessage} />
                </Modal>
            )}
        </form>
    )
};

export default UserInfoPage;