import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export const RetouchePage = () => {
    return (
        <View style={styles.container}>
            <Text>
                <Link href={'/auth/sign-in'}>te</Link>
                retouche
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})