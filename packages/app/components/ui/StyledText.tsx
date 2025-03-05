import { StyleSheet, Text } from 'react-native';

interface Props {
  children: any;
  format?: 'title' | 'subtitle' | 'text';
  style?: object;
}

export default function StyledText({ children, format, style }: Props) {
  const formatStyles = format ? styles[format] : {};

  return <Text style={{ ...formatStyles, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
});
