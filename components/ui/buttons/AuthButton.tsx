import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface IProps {
    title: string;
    onPress: (name: string, password: string) => void;
    name: string;
    password: string;
}

export const AuthButton = ({ title, name, password, onPress }: IProps) => {
    return (
        <TouchableOpacity 
         onPress={() => onPress(name, password)}
         activeOpacity={0.7}>
           <View style={styles.button}>
             <Text style={styles.text}>
                {title}
             </Text>
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   button: {
      width: 200,
      height: 40,
      backgroundColor: '#8ba3de',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
   },
   text: {
     color: 'white',
     fontSize: 18,
   }
})