'use client';

import MuiTheme from '@/theme/MuiTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
