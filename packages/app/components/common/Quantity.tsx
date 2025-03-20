import { StyleSheet, View } from 'react-native';
import StyledButton from '../ui/StyledButton';
import StyledText from '../ui/StyledText';
import { THEME } from '../../theme';
import React from 'react';

interface Props {
  add: () => void;
  decrease: () => void;
  quantity: number;
}

export default function Quantity({ add, decrease, quantity }: Props) {
  return (
    <View style={styles.quantity}>
      <StyledButton
        icon="minus"
        onPress={decrease}
        iconSize="small"
        format="transparent"
      ></StyledButton>
      <StyledText format="small">{quantity}</StyledText>
      <StyledButton
        icon="plus"
        onPress={add}
        iconSize="small"
        format="transparent"
      ></StyledButton>
    </View>
  );
}

const styles = StyleSheet.create({
  quantity: {
    alignItems: 'center',
    borderColor: THEME.colors.details,
    borderRadius: THEME.borderRadius.large,
    borderWidth: THEME.borderWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
  },
});
