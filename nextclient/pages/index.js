import Head from 'next/head'
import Loader from '../components/Loader'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Footer from '../components/Footer'
import {AuthProvider} from '@/components/utils/AuthProvider'


export default function Home() {
  return (
    <AuthProvider>
      <Head>
        <title>FairSplit - Pay dept, Pay Fair </title>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="This is a webapp that helps you to split the money you spent with your friends fairly &#x2F; easily. Just sit back and let us ease your calculations. It is super easy." />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" />
        <link rel="stylesheet" href="style.css" />
        <script src="https://kit.fontawesome.com/77e2c4d813.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous" defer></script>
      </Head>
      <main>
        <div className='bg-success bg-opacity-25 shadow' style={{height:'90vh'}}>
            <Loader />
            <Header />
            <HeroSection />
            <Features />
            <Footer />
        </div>
      </main>
    </AuthProvider>
  )
}
