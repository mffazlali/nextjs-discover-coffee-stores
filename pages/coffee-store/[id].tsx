import { useRouter } from 'next/router'
import Head2 from 'next/head'
import styles from '../../styles/coffee-store.module.css'
import { fetchCoffeeStores } from '../../lib/coffee-stores'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import cls from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { isEmpty } from '@/uttils'
import { StoreContext } from '@/store/store-context'
import useAsyncEffect from 'use-async-effect'
import { ACTION_TYPES } from '@/store/actions'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const response = await fetchCoffeeStores()
  const coffeeStores = [...response.results]
  const paths = coffeeStores.map((coffeeStore) => {
    return { params: { id: coffeeStore.id.toString() } }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (staticProps) => {
  const params = staticProps.params
  const response = await fetchCoffeeStores()
  const coffeeStores = [...response.results]
  const coffeeStore = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params?.id
  )
  return {
    props: { coffeeStore: coffeeStore ? coffeeStore : {} },
  }
}

const CoffeeStore = (initialProps: any) => {
  const router = useRouter()
  let id = router.query.id
  const { state, dispatch } = useContext(StoreContext)
  const { coffeeStores } = state
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const [vitingCount, setVitingCount] = useState(0)

  const handleCreateCoffeeStore = async (coffeeStore: any) => {
    const { id, name, address, neighbourhood, imgUrl, viting } = coffeeStore
    const createdCoffeeStore = await fetch(
      'http://localhost:3000/api/createCoffeeStore',
      {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
          address: address || '',
          neighbourhood: neighbourhood || '',
          imgUrl,
          viting: viting || 0,
        }),
      }
    )
    return createdCoffeeStore
  }

  const handleGetCoffeeStoreById = async (id: any) => {
    const findedCoffeeStore = await fetch(
      `http://localhost:3000/api/getCoffeeStoreById?id=${id}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json())
    return findedCoffeeStore
  }

  useAsyncEffect(async () => {
    if (
      initialProps?.coffeeStore == undefined ||
      isEmpty(initialProps?.coffeeStore)
    ) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreInContext = coffeeStores.find(
          (coffeeStore) => coffeeStore.id.toString() === id
        )
        // CSR
        if (findCoffeeStoreInContext) {
          setCoffeeStore(findCoffeeStoreInContext)
        }
      } else {
        id = router.asPath.split('/').pop()
        const findCoffeeStoreinDB = await handleGetCoffeeStoreById(id)
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: {
            ...state,
            coffeeStores: [...coffeeStores, findCoffeeStoreinDB.results],
          },
        })
        setCoffeeStore(findCoffeeStoreinDB.results)
      }
    } else {
      // SSG
      handleCreateCoffeeStore(initialProps?.coffeeStore)
    }
  }, [initialProps, initialProps.coffeeStore])

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <span className="block w-32 h-32 rounded-full border-[8px] border-black border-t-black/10 border-r-black/10 animate-spin"></span>
        <span className="text-xl font-medium capitalize">loading</span>
      </div>
    )
  }

  const handleUpVoteButton = () => {
    setVitingCount(vitingCount + 1)
  }
  const { address, neighbourhood, name, imgUrl } = coffeeStore

  return (
    <div className={styles.layout}>
      <Head2>
        <title>{name}</title>
        <Script
          src="/public/fonts/fontawesome.js"
          crossOrigin="anonymous"
        ></Script>
      </Head2>
      <div className={styles.container}>
        <div className={styles.backWrapper}>
          <Link legacyBehavior href={'/'}>
            <a className={cls(styles.back, 'fa fa-arrow-left')}>
              &larr; back to home
            </a>
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.col1}>
          <div className={styles.imageWrapper}>
            <Image
              unoptimized={true}
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              fill={true}
              alt={name}
              className="object-cover"
            ></Image>
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                alt=""
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt=""
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          {
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/star.svg"
                alt=""
                width={24}
                height={24}
                className={styles.icon}
              />
              <p className={styles.text}>{vitingCount}</p>
            </div>
          }
          <div className={styles.upVoteWrapper}>
            <button className={styles.button} onClick={handleUpVoteButton}>
              up vote!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoffeeStore
