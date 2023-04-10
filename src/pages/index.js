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

function CopyToClipboard(props) {
  const [copySuccess, setCopySuccess] = useState(false)

  function handleCopyClick() {
    navigator.clipboard.writeText(props.text)
    setCopySuccess(true)
  }

  return (
    <div>
      <button onClick={handleCopyClick}>Copy to clipboard</button>
      {copySuccess && <span style={{color: 'green'}}>Copied to clipboard!</span>}
    </div>
  )
}
/*
function base52Encode(str) {
  const codeUnits = Array.from(str).map(c => BigInt(c.charCodeAt(0)));
  let num = 0n;
  for (let i = 0; i < codeUnits.length; i++) {
    num = num * 256n + codeUnits[i];
  }
  let base52 = '';
  while (num > 0) {
    let remainder = num % 52n;
    num = (num - remainder) / 52n;
    base52 = String.fromCharCode(Number(remainder) + (remainder < 26n ? 65 : 71)) + base52;
  }
  return base52 || '0';
}
*/

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const router = useRouter()

	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')

	let [encodedURL, setEncodedURL] = useState('')//encodeURIComponent(`${window.location.protocol}//${window.location.host}/embeds/${text}?image=${image}&description=${description}&url=${url}`))
const [baseUrl1, setBaseUrl] = useState('');
	let [encodedTwitterURL, setEncodedTwitterURL] = useState('')

const [video, setVideo] = useState('')

const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setBaseUrl(window.location.protocol + '//' + window.location.host);
  }, []);

useEffect(() => {
  if (text && description && url) {
    setEncodedURL(`${baseUrl1}/embeds/${btoa(`?text=${text}&image=${image}&description=${description}&url=${url}&video=${video}`)}`);
    setEncodedURL(`${baseUrl1}/twitter/${btoa(`?text=${text}&image=${image}&description=${description}&url=${url}&video=${video}`)}`);

	  setIsDisabled(false);
  } else {
    setIsDisabled(true);
  }
}, [baseUrl1, text, image, description, url]);
/*
	useEffect(() => {
		/*const baseUrl = `${baseUrl1}`;
		const urlParams = new URLSearchParams({
      		image: image, //encodeURIComponent(image),
      		description: description, //encodeURIComponent(description),
      url: url, //encodeURIComponent(url),
    });
setEncodedURL(`${window.location.protocol}//${window.location.host}/embeds/${btoa(`?text=${text}&image=${image}&description=${description}&url=${url}`)}`);
		console.log(encodedURL)
    //setEncodedURL(`${baseUrl}/embeds/${encodeURIComponent(text)}?${urlParams}`);
  }, [text, image, description, url]);
*/
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

	function handleCopy() {
  navigator.clipboard.writeText(encodedURL);
}
	
		function handleTwitterCopy() {
  navigator.clipboard.writeText(encodedTwitterURL);
}

function handleVideo(event) {
 setVideo(event.target.value);
}

	
	return (
    		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-4xl font-bold">Embed Gen</h1>
			<p className="text-2xl">Text field:</p>
			<input type="text" className="text-4xl text-black" onChange={handleTextChange}/>
			<p className="text-2xl">Image (Optional):</p>
			<input type="text" className="text-4xl text-black" onChange={handleImageChange}/>
			<p className="text-2xl">Description:</p>
			<textarea type="text" className="text-4xl text-black" onChange={handleDescriptionChange}/>
			<p className="text-2xl">URL:</p>
			<input type="text" className="text-4xl text-black" onChange={handleUrlChange}/>
			<p className="text-2xl">Video (Optional):</p>
			<input type="text" className="text-4xl text-black" onChange={handleVideo}/>
			<button className="text-xl bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50" onClick={handleCopy} disabled={isDisabled}>Copy Open Graph To Clipboard!</button>
			<button className="text-xl bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50" onClick={handleTwitterCopy} disabled={isDisabled}>Copy Twitter To Clipboard!</button>
		</main>

  	)
}
