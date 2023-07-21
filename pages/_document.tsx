import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Link
          rel="preload"
          href="/static/fonts/IBM_Plex_Sans/IBMPlexSans-Regular.ttf"
          as="font"
        ></Link>
        <Link
          rel="preload"
          href="/static/fonts/IBM_Plex_Sans/IBMPlexSans-Bold.ttf"
          as="font"
        ></Link>
        <Link
          rel="preload"
          href="/static/fonts/IBM_Plex_Sans/IBMPlexSans-SemiBold.ttf"
          as="font"
        ></Link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
