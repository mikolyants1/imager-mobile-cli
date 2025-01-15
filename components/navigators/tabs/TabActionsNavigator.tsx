import { Tabs } from "expo-router";
import Icon from '@expo/vector-icons/MaterialIcons';
import { Text } from "react-native";

export const TabActionsNavigator = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor:'blue', headerShown: false }}>
           <Tabs.Screen
             name="index"
             options={{
                title: 'Редактирование',
                tabBarIcon: ({color}) => <Icon name='color-lens' size={25} color='red' />
             }}
            />
           <Tabs.Screen
             name="retouche"
             options={{
                title: 'Ретушь',
                tabBarIcon: ({color}) => <Icon name='brush' color={color} />
             }}
           />
        </Tabs>
    )
}