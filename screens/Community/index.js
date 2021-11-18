import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from './CommunityScreen';
import ChatScreen from './ChatScreen';


const index = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator >
              <Stack.Screen options={ {headerShown:false}} name='community' component={CommunityScreen} />
              <Stack.Screen options={ {headerShown:false}} name='chat' component={ChatScreen} />
        </Stack.Navigator>
    )
}

export default index
