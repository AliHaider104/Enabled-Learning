import React from 'react'
import { StyleSheet, Image,Text, View , Pressable } from 'react-native'

const OnBoardingScreen = ({ navigation }) => {
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <Pressable style={styles.diamond}
                onPress = { () => navigation.navigate('login')}>
                    <View style={styles.innerDiamond}>
                        <Text style={styles.innerText}>Sign In</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.diamond}
                onPress = { () => navigation.navigate('register')}>
                    <View style={styles.innerDiamond}>
                        <Text style={styles.innerText}>Sign Up</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    background:{
        backgroundColor:'#50B8E7',
        flex:1,
        alignItems:'center',
    },
    logoContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    logo:{
        width:150,
        height:150,
        resizeMode:'contain',
    },
    body:{
        flex:2,
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
    },
    diamond:{
        padding:15,
        width:150,
        height:150,
        alignItems:'center',
        justifyContent:'center',
        transform: [{ rotate: "45deg" }],
        backgroundColor:'#2A89FF',
        marginBottom:'20%',

    },
    innerText:{
        color:'#fff',
        fontSize:20,
        transform: [{ rotate: "-45deg" }],
    },
    innerDiamond:{
        borderWidth:3,
        borderColor:'#fff',
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#2A89FF',
    }
   
})
