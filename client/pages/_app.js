import { ThemeProvider } from 'styled-components';

import Global from '../styles/Global';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
