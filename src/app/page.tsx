import { Calendar } from "@/components/Calendar";
import styles from "./page.module.sass";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}
