import '../styles/globals.css'
import '../styles/style.css'
import type { AppProps } from 'next/app'
import type { NextComponentType  } from 'next' //Import Component type

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // add auth type fo fix build
}

import { SessionProvider, signIn, useSession  } from 'next-auth/react'
import { useEffect } from 'react'

function MyApp({ 
  Component, 
  pageProps: { session,  ...pageProps },
  router,

}: CustomAppProps) {
  return (
    <SessionProvider session={ session }>
      { Component.auth ? (
          <Auth>
            <Component {...pageProps} />   
          </Auth>
        )  : (
          <Component {...pageProps} />   
        )
      
      }
      
    </SessionProvider>
  )
  
  
}

function Auth({ children }: any) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status])

  if (isUser) {
    return children
  }

  return <div></div>
}

export default MyApp
