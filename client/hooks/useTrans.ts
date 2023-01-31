import { useRouter } from 'next/router';
import en from './../public/lang/en.js'
import zho from './../public/lang/zho.js'

const useTrans = () => {
    let { asPath, locale } = useRouter()
    const router = useRouter

    const language = (locale === 'zho' ? zho : en) 
    const translate = { language, asPath, locale, router } 
    return translate
}

export default useTrans