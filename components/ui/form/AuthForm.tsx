import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { AuthButton } from "../../ui/buttons/AuthButton";
import { useState } from "react";
import { Link } from "expo-router";

interface IProps {
    title: string;
    redirect?: {
        title: string;
        href: string;
    };
    onSubmit: (name: string, pass: string) => void;
}

export const AuthForm = ({ title, redirect, onSubmit }: IProps) => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onChangeName = (name: string) => {
        setName(name);
    }

    const onChangePassword = (pass: string) => {
        setPassword(pass);
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }
    return (
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.container}>
          <View style={styles.auth__container}>
            <TextInput
              placeholder="Логин" 
              onChangeText={onChangeName}
              style={styles.input}
            />
           <TextInput
             placeholder="Пароль"
             onChangeText={onChangePassword}
             style={styles.input}
            />
            <AuthButton
              title={title}
              name={name}
              password={password}
              onPress={onSubmit}
             />
             {!!redirect && (
                <Link href={redirect.href}>
                  {redirect.title}
                </Link>
             )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    auth__container: {
       width: 200,
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'column',
       gap: 35,
    },
    input: {
        width: 260,
        height: 60,
        backgroundColor: 'rgb(230,230,230))',
        paddingLeft:5,
        borderRadius: 10,
        fontSize: 18
    }
})