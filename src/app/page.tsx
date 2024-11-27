import styles from '@/styles/Layout.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to AI Chat</h1>
        <p>Start a conversation with our AI assistant</p>
        <div className="chat-container">
          {/* Chat components will go here */}
        </div>
      </main>
    </div>
  )
} 