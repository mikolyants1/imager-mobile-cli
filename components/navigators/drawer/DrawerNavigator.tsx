import 'react-native-gesture-handler';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Drawer} from 'expo-router/drawer';

export const DrawerNavigator = () => {
    return (
      <GestureHandlerRootView style={{ flex:1 }}>
        <Drawer>
          <Drawer.Screen
            name='actions'
            options={{
                drawerLabel: 'Действия',
                title: 'Действия 1',
                drawerIcon: ({ color,size }) => <Icon name='brush' size={size} color={color} />
            }}
          />
         <Drawer.Screen
           name='profile'
           options={{
              drawerLabel: 'Профиль',
              title: 'Профиль',
              drawerIcon: ({ color,size }) => <Icon name='airlines' size={size} color={color} />
           }}
          />
        </Drawer>
      </GestureHandlerRootView>
    )
}