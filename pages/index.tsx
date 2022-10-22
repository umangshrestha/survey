import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Footer } from '../components/footer'
import { Logo } from '../components/logo'
import { ProgressBar } from '../components/progressbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Home</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <ProgressBar percentage={0} />
      <Logo />
      <h1 className={styles.title}>
        <a href="https://brightspace.uwindsor.ca/">Brightspace</a> Survey </h1>

      <p className={styles.description}>
        <code>Welcome!!!</code> How can we help you today?
      </p>

      <div className={styles.grid}>
        <a href=" https://ctl2.uwindsor.ca/workshops/145/" className={styles.card}>
          <h2>Workshops &rarr;</h2>
          <p> Further develop teaching and learning and utilizing Brightspace.</p>
        </a>
        <Link href="/survey" className={styles.card}>
          <h2>Survey &rarr;</h2>
          <p>  Providing valuable feedback about the session you attended.</p>
        </Link>
        <a href="https://blackboard.ca/bbcafe" className={styles.card}>
          <h2> BBCafe &rarr;</h2>
          <p> Take assistance from our trained assistants to naviagate issues.</p>
        </a>
        <a href="https://uwindsor.teamdynamix.com/" className={styles.card}>
          <h2>TDX &rarr;</h2>
          <p>  Raise tickets for teachnical issues realted to Brightspace.</p>
        </a>

      </div>
    </main>

    <Footer />
  </div>
)


export default Home
