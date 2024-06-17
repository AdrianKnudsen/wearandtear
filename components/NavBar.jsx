'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/NavBar.module.css'
import { useNavLogic } from '@/lib/navLogic'

const NavBar = () => {
  const { menuOpen, toggleMenu, closeMenu } = useNavLogic()

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link className={styles.Logolink} href="/" onClick={closeMenu}>
            <span className={styles.letterW}>W</span>
            <span className={styles.letterT}>T</span>
          </Link>
        </div>
        <h3 className={styles.logoText}>Wear&Tear</h3>
        <ul className={`${styles.ul} ${menuOpen ? styles.showMenu : ''}`}>
          <li>
            <Link className={styles.link} href="/women" onClick={closeMenu}>
              <span className={styles.span}>Women</span>
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/men" onClick={closeMenu}>
              <span className={styles.span}>Men</span>
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              href="/collection"
              onClick={closeMenu}
            >
              <span className={styles.span}>Collection</span>
            </Link>
          </li>
          <li>
            <Link className={styles.link} href="/outlet" onClick={closeMenu}>
              <span className={styles.span}>Outlet</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.ul2}>
          <li>
            <Image
              src="/svg/search.svg"
              alt="Search icon"
              width={20}
              height={20}
            />
          </li>
          <li>
            <Link href="/cart">
              <Image
                src="/svg/cart.svg"
                alt="Cart icon"
                width={20}
                height={20}
              />
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <Image
                src="/svg/phone.svg"
                alt="Contact icon"
                width={20}
                height={20}
              />
            </Link>
          </li>
          <li>
            <Link href="/login">
              <Image
                src="/svg/login.svg"
                alt="Login icon"
                width={20}
                height={20}
              />
            </Link>
          </li>
          <li>
            <Link href="/favorite">
              <Image
                src="/svg/favorite.svg"
                alt="Favorite icon"
                width={20}
                height={20}
              />
            </Link>
          </li>
        </ul>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </nav>
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileUl}>
            <li>
              <Link
                className={styles.mobileLink}
                href="/women"
                onClick={closeMenu}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/men"
                onClick={closeMenu}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/collection"
                onClick={closeMenu}
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/outlet"
                onClick={closeMenu}
              >
                Outlet
              </Link>
            </li>
            <li>
              <Image
                src="/svg/search.svg"
                alt="Search icon"
                width={20}
                height={20}
              />
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/cart"
                onClick={closeMenu}
              >
                <Image
                  src="/svg/cart.svg"
                  alt="Cart icon"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/contact"
                onClick={closeMenu}
              >
                <Image
                  src="/svg/phone.svg"
                  alt="Contact icon"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/login"
                onClick={closeMenu}
              >
                <Image
                  src="/svg/login.svg"
                  alt="Login icon"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
            <li>
              <Link
                className={styles.mobileLink}
                href="/favorite"
                onClick={closeMenu}
              >
                <Image
                  src="/svg/favorite.svg"
                  alt="Favorite icon"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default NavBar
