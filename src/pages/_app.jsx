import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { theme } from '@/lib/theme';
import { Dosis, Inter, Titillium_Web } from 'next/font/google'

export default function App({ Component, pageProps }) {
    return (
      <ThemeProvider theme={theme}>
        <ClerkProvider {...pageProps}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClerkProvider>
      </ThemeProvider>
    );
  }
  