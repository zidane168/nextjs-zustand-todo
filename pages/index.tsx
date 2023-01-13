import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TDFooter from './../components/TDFooter'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Welcome Todo List by Learn Tech Tips - Zidane</title>
        <link rel="icon" href="/favicon.ico" />
        <meta http-equiv="Refresh" content="0; url='/todos'" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a href="https://learn-tech-tips.blogspot.com" className="text-blue-600"> Learn Tech Tips - Zidane </a>
        
        </h1> 
      </main>

      <TDFooter/>
    </div>
  )
}

export default Home
