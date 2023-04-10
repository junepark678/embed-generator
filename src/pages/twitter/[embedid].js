import {useRouter} from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'

function base52Decode(encoded) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decoded = "";
  let current = 0;
  let bits = 0;

  for (let i = 0; i < encoded.length; i++) {
    current = current * 52 + chars.indexOf(encoded[i]);
    bits += 5;

    while (bits >= 8) {
      bits -= 8;
      decoded += String.fromCharCode((current >> bits) & 255);
    }
  }

  return decoded;
}

export async function getServerSideProps(context) {
  const { embedid } = context.query;
  const decodedString = decodeURIComponent(atob(embedid));
  return {
    props: {
      decodedString,
    },
  };
}

export default function Embed({decodedString}) {
	const router = useRouter()
	
	let decodedString1 = new URLSearchParams(decodedString)

	console.log(decodedString1)

	return (
		<>
		<Head>
      <meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:title" content={decodedString1.get('text')} />
      <meta property="twitter:site" content="@pythonplayer12" />
			<meta property="twitter:description" content={decodedString1.get('description')} />
			<meta property="twitter:image" content={decodedString1.get('image')} />
		</Head>
		<p>Title: {decodedString1.get('text')}</p>
		<p>Description: {decodedString1.get('description')}</p>
		<a href={decodedString1.get('url')}><p>URL: {decodedString1.get('url')}</p></a>
		<p>Image: <img src={decodedString1.get('image')}/></p>

		</>
	)
}
