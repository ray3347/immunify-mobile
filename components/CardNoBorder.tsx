import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, GestureResponderEvent, Touchable } from 'react-native';
import Label from './Label';
interface CardNoBorderProps{
    onPress: (event: GestureResponderEvent) => void;
    title: string;
    summary: string;
    imageSource: any;
}

const CardNoBorder: React.FC<CardNoBorderProps> = ({
    onPress,
    title,
    summary,
    imageSource,
}) => {
    return(
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Image source={imageSource} style={styles.cardImage} />
            <View style={styles.headerContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">{summary}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        overflow: 'hidden',
        marginBottom: 16,
        width: 260,
        marginRight: 16,
        
      },
      headerContainer:{
        paddingTop: 12,
      },
      cardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 4,
      },
      title: {
        fontSize: 16,
        color: '#333',
        flexShrink: 1,
        fontWeight: '500',
      },
      subtitle: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
        flexShrink: 1,
      },
})

export default CardNoBorder;