import { View, StyleSheet } from 'react-native';
import StyledText from '../../components/ui/StyledText';
import StyledButton from '../../components/ui/StyledButton';
import { useLogin } from '../../hooks/useLogin';
import StyledTextInput from '../../components/ui/StyledTextInput';
import { THEME } from '../../theme';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isSubmitted,
    token,
    finished,
  } = useLogin();

  const goToHome = () => {
    navigation.navigate('Products');
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Products');
    }
  }, [token, navigation]);

  return (
    <View style={styles.container}>
      <StyledText style={styles.title}>Iniciar sesión</StyledText>

      {finished && (
        <StyledText style={styles.red}>Credenciales incorrectas</StyledText>
      )}

      <View>
        <StyledText style={styles.label}>
          <StyledText style={styles.red}>*</StyledText>
          Correo electrónico
        </StyledText>
        <StyledTextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          isRequired={true}
          isSubmitted={isSubmitted}
        />
      </View>

      <View>
        <StyledText style={styles.label}>
          <StyledText style={styles.red}>*</StyledText>
          Contraseña
        </StyledText>
        <StyledTextInput
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          isRequired={true}
          isSubmitted={isSubmitted}
        />
      </View>

      <StyledButton
        text="Iniciar sesión"
        format="success"
        onPress={() => handleLogin(goToHome)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: THEME.padding.container,
    gap: THEME.gap.large,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: THEME.padding.container,
    textAlign: 'center',
  },
  label: {
    fontSize: THEME.fontSizes.text,
    marginBottom: THEME.padding.small,
  },
  red: {
    color: THEME.colors.red,
  },
});
