import Hero from '@/components/Hero'
import Deals from '@/components/Deals'
import styles from '@/styles/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Deals />
    </main>
  )
}
