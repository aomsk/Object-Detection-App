import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40, textAlign: 'center', margin: 30 }}>Main Menu</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Obstruction')}
                    accessible={true} // optional, this is the default
                    accessibilityLabel={'ปุ่มตรวจจับสิ่งกีดขวาง'} // overrides child content
                    accessibilityTraits={'Obstruction Detection button'} // only works in ios
                    accessibilityComponentType={'Obstruction Detection button'} // only works in android
                    accessibilityHint={'แตะ 2 ครั้ง เพื่อเปิด'}
                    accessibilityState={{ 'selected': true }}
                >
                    <Text style={styles.textButton}>Obstruction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Object')}
                    accessible={true} // optional, this is the default
                    accessibilityLabel={'ปุ่มตรวจจับวัตถุ'} // overrides child content
                    accessibilityTraits={'Object Detection button'} // only works in ios
                    accessibilityComponentType={'Object Detection button'} // only works in android
                    accessibilityHint={'แตะ 2 ครั้ง เพื่อเปิด'}
                    accessibilityState={{ 'selected': true }}
                >
                    <Text style={styles.textButton}>Object</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Money')}
                    accessible={true} // optional, this is the default
                    accessibilityLabel={'ปุ่มตรวจจับธนบัตร'} // overrides child content
                    accessibilityTraits={'Money Detection button'} // only works in ios
                    accessibilityComponentType={'Money Detection button'} // only works in android
                    accessibilityHint={'แตะ 2 ครั้ง เพื่อเปิด'}
                    accessibilityState={{ 'selected': true }}
                >
                    <Text style={styles.textButton}>Money & Coin</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flex: 1,
        // backgroundColor: 'pink',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 20,
        margin: 10,
        width: 350,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 25,
    }
})