import { StyleSheet, TextInput } from 'react-native';
import { THEME } from '../../theme';
import { Dispatch, SetStateAction } from 'react';
import StyledText from './StyledText';

interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: Dispatch<SetStateAction<any>>;
  isRequired?: boolean;
  isSubmitted?: boolean;
}

export default function StyledTextInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  isRequired = false,
  isSubmitted = false,
}: Props) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {isRequired && isSubmitted && !value && (
        <StyledText style={styles.small} format="small">
          Este campo es obligatorio
        </StyledText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: THEME.colors.details,
    borderWidth: THEME.borderWidth,
    paddingLeft: THEME.padding.item,
    borderRadius: THEME.borderRadius.medium,
  },
  small: {
    color: THEME.colors.red,
  },
});
