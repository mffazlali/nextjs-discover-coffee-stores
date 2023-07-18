import Link from 'next/link'
import styles from './card.module.css'
import Image from 'next/image'
import cls from 'classnames'

const Card = (props: { href: string; name: string; imgUrl: string }) => {
  return (
    <Link legacyBehavior href={props.href}>
      <a>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              src={props.imgUrl}
              alt={props.name}
              fill={true}
              className="object-cover"
              unoptimized={true}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
