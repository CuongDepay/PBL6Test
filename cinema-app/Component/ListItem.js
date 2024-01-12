import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ListItem = ({data, renderItem}) => {
  return(
    <FlatList
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ListItem; 