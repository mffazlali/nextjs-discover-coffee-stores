'use client'
import { useRouter } from 'next/router'
import Head2 from 'next/head'
import styles from '../../styles/coffee-store.module.css'
import {
  createCoffeeStore,
  getCoffeeStoreById,
  getCoffeeStores,
  updateCoffeeStoreById,
} from '../../lib/services/coffee-stores'
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
import useSWR from 'swr'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const response = await getCoffeeStores()
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
  const response = await getCoffeeStores()
  const coffeeStores = [...response.results]
  const coffeeStore = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params?.id
  )
  return {
    props: { coffeeStore: coffeeStore ? coffeeStore : {} },
  }
}

const CoffeeStore = (initialProps: any) => {
  const fetcher = (...args: any) => fetch(args).then((res) => res.json())
  const router = useRouter()
  let id = router.query.id
  const { state, dispatch } = useContext(StoreContext)
  const { coffeeStores } = state
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
  const [votingCount, setVotingCount] = useState(0)
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

  const handleCreateCoffeeStore = async (coffeeStore: any) => {
    return createCoffeeStore(coffeeStore)
  }

  const handleGetCoffeeStoreById = async (id: any) => {
    return getCoffeeStoreById(id)
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
  }, [id, initialProps, initialProps.coffeeStore])

  useEffect(() => {
    if (data && data.results) {
      setVotingCount(data.results.voting)
    }
  }, [data])

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <span className="block w-32 h-32 rounded-full border-[8px] border-black border-t-black/10 border-r-black/10 animate-spin"></span>
        <span className="text-xl font-medium capitalize">loading...</span>
      </div>
    )
  }

  const handleUpVoteButton = async () => {
    const findedCoffeeStore = await getCoffeeStoreById(coffeeStore.id)
    if (
      findedCoffeeStore &&
      findedCoffeeStore.results &&
      !isEmpty(findedCoffeeStore.results)
    ) {
      findedCoffeeStore.results.voting += 1
      const updatedCofeeStore = await updateCoffeeStoreById(
        findedCoffeeStore.results
      )
      setVotingCount(updatedCofeeStore.results.voting)
    }
  }

  const { address, neighbourhood, name, imgUrl } = coffeeStore

  return (
    <div className={styles.layout}>
      <Head2>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
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
          <div aria-label={name} className={styles.imageWrapper}>
            <Image
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              fill={true}
              alt={name}
              className="object-cover"
              unoptimized={false}
            ></Image>
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          {address && (
            <div aria-label='places' className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                alt="places icon"
                width={24}
                height={24}
                className={styles.icon}
                unoptimized={false}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighbourhood && (
            <div aria-label='near me' className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt="near me icon"
                width={24}
                height={24}
                className={styles.icon}
                unoptimized={false}
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          {
            <div aria-label='star' className={styles.iconWrapper}>
              <Image
                src="/static/icons/star.svg"
                alt="star icon"
                width={24}
                height={24}
                className={styles.icon}
                unoptimized={false}
              />
              <p className={styles.text}>{votingCount}</p>
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
