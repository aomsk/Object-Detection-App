import { Camera } from 'expo-camera';
import { StyleSheet, Button, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

import { LoadingView } from './src/utils/LoadingView';
//import Navigation
import StackNavigation from './src/Navigation/StackNavigation';

export default function App() {

    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission?.granted) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <LoadingView message="Camera permission is required to continue">
                    <Button
                        title="Grant permission"
                        onPress={requestPermission}
                    ></Button>
                </LoadingView>
            </View>
        );
    }

    console.log('permission: ', permission);

    return (
        <StackNavigation />
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
