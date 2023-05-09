import styles from './index.module.scss';

const GettingStarted = () => {
  return (
    <div className={styles.container}>
      <div className={styles.note}>
        <div className={styles.header}>
          <div className={styles.emoji_wrapper}>
            <div className={styles.emoji}>🚀</div>
          </div>
          <div className={styles.header_content}>
            <div className={styles.title}>Getting Started</div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.content}>
            <p>👋 Welcome to Note App!</p>
            <br />
            <p>Here are the basics:</p>
            <p>
              ➡️ You can start by adding a note clicking on the "+ Add Note"
              button on the sidebar on the left.
            </p>
            <p>
              ➡️ Currently you can add, favorite, duplicate and delete notes. In
              each note you can add an emoji, a title and type into the text
              area.
            </p>
            <br />
            <p>More features coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
