import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


export const getServerSideProps = async () => {
  return {
    props: {},
    // disable automatic static optimization for this page
  }
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const router = useRouter()

	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')

	let [encodedURL, setEncodedURL] = useState('')//encodeURIComponent(`${window.location.protocol}//${window.location.host}/embeds/${text}?image=${image}&description=${description}&url=${url}`))
const [baseUrl1, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.protocol + '//' + window.location.host);
  }, []);

	useEffect(() => {
		/*const baseUrl = `${baseUrl1}`;
		const urlParams = new URLSearchParams({
      		image: image, //encodeURIComponent(image),
      		description: description, //encodeURIComponent(description),
      url: url, //encodeURIComponent(url),
    });*/
setEncodedURL(`${window.location.protocol}//${window.location.host}/embeds/${text}?image=${image}&description=${description}&url=${url}`);
    //setEncodedURL(`${baseUrl}/embeds/${encodeURIComponent(text)}?${urlParams}`);
  }, [text, image, description, url]);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleImageChange(event) {
    setImage(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }
	
	return (
    		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold">Embed Gen</h1>
			<p className="text-2xl">Text field:</p>
			<input type="text" className="text-4xl text-black" onChange={handleTextChange}/>
			<p className="text-2xl">Image:</p>
			<input type="text" className="text-4xl text-black" onChange={handleImageChange}/>
			<p className="text-2xl">Description:</p>
			<input type="text" className="text-4xl text-black" onChange={handleDescriptionChange}/>
			<p className="text-2xl">URL:</p>
			<input type="text" className="text-4xl text-black" onChange={handleUrlChange}/>
			<p className="text-2xl">{encodedURL}</p>
		</main>

  	)
}
