import {useRouter} from 'next/router'
import Head from 'next/head'


export default function Embed() {
	const router = useRouter()
	const {embedid, image, url, description} = router.query
	

	return (
		<>
		<Head>
			<meta property="og:title" content={embedid}/>
			<meta property="og:description" content={description}/>
			<meta property="og:image" content={image}/>
			<meta property="og:url" content={url}/>
		</Head>
		</>
	)
}
