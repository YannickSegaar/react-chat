'use client';

import { Howdy } from '@voiceflow/chat/ui';
import localFont from 'next/font/local';
import Head from 'next/head';

import styles from '@/styles/Home.module.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Voiceflow React-Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <Howdy />
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}