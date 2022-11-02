import { NativeBaseProvider, Center, Text } from "native-base";

import { Loading } from './src/components/Loading';
import { SingIn } from './src/screens/SingIn';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/themes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <SingIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
