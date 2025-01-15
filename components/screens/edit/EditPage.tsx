import { Image, StyleSheet, Text, View } from "react-native"

export const EditPage = () => {
    return (
        <View style={styles.container}>
            <Text>
                edit
                <Image onLoad={(e) =>e.target} />
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