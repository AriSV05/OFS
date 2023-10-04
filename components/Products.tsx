import React from 'react'
import Image from 'next/image';

import styles from '@/styles/Productos.module.css'

export default function Productos() {
    return (

        <div className={styles.products_container}>
            <h1>Empresa de caramelos BigBen</h1>
            <div className={styles.image_container}>
                <Image src="/images/big-gen-3.jpg" width='200' height='200' alt='Imagen 1' />
                <Image src="/images/big-ben-5.jpg" alt='Imagen 2' width='200' height='200' />
                <Image src="/images/big-ben-clasicos-bolsa.jpg" alt="Imagen 3" width='150' height='150' />
                <Image src="/images/cod1.png" alt="Código 1" width='75' height='45' />
                <Image src="/images/cod2.jpg" alt="Código 2" width='75' height='75' />
                <Image src="/images/cod3.png" alt="Código 3" width='75' height='45' />
                <button className={styles.button_price}>
                    <span className={styles.price_text}>Precio</span>
                    <span className={styles.price}>$10</span>
                </button>
                <button className={styles.button_price}>
                    <span className={styles.price_text}>Precio</span>
                    <span className={styles.price}>$12</span>
                </button>
                <button className={styles.button_price}>
                    <span className={styles.price_text}>Precio</span>
                    <span className={styles.price}>$13</span>
                </button>
            </div>
        </div>
    )
}

