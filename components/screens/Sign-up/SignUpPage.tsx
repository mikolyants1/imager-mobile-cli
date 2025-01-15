import { useCallback } from "react";
import { AuthForm } from "../../ui/form/AuthForm";

export const SignГзPage = () => {
    const onSubmit = useCallback((name: string, password: string) => {

    }, [])
    
    return (
      <AuthForm
       onSubmit={onSubmit}
       redirect={{
         href: '/auth/sign-in',
         title: 'Войти'
       }}
       title="Зарегистрироваться"
      />
    )
}
