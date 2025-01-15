import { useCallback } from "react";
import { AuthForm } from "../../ui/form/AuthForm";

export const SignInPage = () => {
    const onSubmit = useCallback((name: string, password: string) => {

    }, [])
    
    return (
      <AuthForm
       onSubmit={onSubmit}
       redirect={{
         href: '/auth/sign-up',
         title: 'Зарегистрироваться'
       }}
       title="Войти"
      />
    )
}
