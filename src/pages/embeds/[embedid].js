import {useRouter} from 'next/router'
import Head from 'next/head'


export default function Embed() {
	const router = useRouter()
	const {embedid} = router.query
	
	return (
		<>
		<Head>
			<meta property="og:title" content="test"/>
			<meta property="og:description" content="pythonplayer123's embed"/>
			<meta property="og:image" content="https://cdn.discordapp.com/avatars/825691714383511582/ccd32bc68a5466a0c511eba28f3e0532.png?size=4096"/>
			<meta property="og:url" content="https://junengames.me"/>
		</Head>
		</>
	)
}
