import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { Camera } from "expo-camera";
import { LoadingView } from './src/LoadingView';
import { useTensorFlowLoaded } from './src/useTensorFlow';
import { ModelView } from './src/ModelView';

export default function App() {
    const isLoaded = useTensorFlowLoaded()
    const [permission, requestPermission] = Camera.useCameraPermissions();
    if (!permission?.granted) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <LoadingView message='Camera permission is required to continue'>
                    <Button title='Grant permission' onPress={requestPermission}></Button>
                </LoadingView>
            </View>
        );
    }

    if (!isLoaded) {
        <LoadingView message='Model Loading...'/>
    }
    return (
        <ModelView />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
