import {useRouter} from 'next/router'
import Head from 'next/head'
import { useEffect, useState } from 'react'

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
			<meta property="og:title" content={decodedString1.get('text')}/>
			<meta property="og:description" content={decodedString1.get('description')}/>
			<meta property="og:image" content={decodedString1.get('image')}/>
			<meta property="og:url" content={decodedString1.get('url')}/>
			<meta property="og:video" content={decodedString1.get('video')}/>
		</Head>
		</>
	)
}
