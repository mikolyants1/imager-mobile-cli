import { Pressable, Text, View } from "react-native"
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { useFile } from "../../store/file/useFile";

export const UploadButton = () => {
    const {setFileData} = useFile();
    const upload = async () => {
       const { status } = await requestMediaLibraryPermissionsAsync();
       if (status !== 'granted') return;
       const result = await launchImageLibraryAsync({
         mediaTypes: 'images',
         allowsEditing: true,
         aspect: [4,3],
         quality: 1,
       });
       if (result.assets?.length) {
        const data = result.assets[0];
        data.fileName && setFileData('fileName', data.fileName);
        data.file && setFileData('file', data.file);
        
       }
    }
    return (
        <View>
            <Pressable>
                <Text>
                    выбрать изображение
                </Text>
            </Pressable>
        </View>
    )
}