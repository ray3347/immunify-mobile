import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
type LabelVariant = 'gray' | 'teal';
interface TextButtonProps {
  text: string;
  onPress: () => void;
  variant?: LabelVariant;
}

const TextButton: React.FC<TextButtonProps> = ({text, onPress, variant = 'gray'}) => {
  const isGray = variant === 'gray';
  const textColor = isGray ? '#9E9E9E' : '#008B8B';
  return(
    <TouchableOpacity onPress={onPress}>
        <Text style={[{color: textColor},{fontSize: 14} ]}>
        {text}
        </Text>
    </TouchableOpacity>
  );
  
};

export default TextButton;
