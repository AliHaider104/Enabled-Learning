import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CommunityUserComponent = ({username,uid}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{ navigation.navigate( 'chat' , {Username: username , Uid:uid}) }} >
            <View style={styles.UserProfile}>
                <AntDesign name="user" size={24} color="lightgray" />
            </View>
            <Text style={styles.username} >{username}</Text>
        </TouchableOpacity>
    )
}

export default CommunityUserComponent

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:'#fff',
        width:'100%',
        padding:20,
        flexDirection:'row',
        borderLeftWidth:5,
        borderTopLeftRadius:5,
        borderLeftColor:'#50B8E8',
        borderBottomLeftRadius:5,

        borderBottomWidth:1,
    },
    UserProfile:{
        backgroundColor:'#50B8E7',
        padding:10,
        marginRight:'5%',
        borderRadius:25,
    },
    username:{
        fontSize:15,
    }
})
