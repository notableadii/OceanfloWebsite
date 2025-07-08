"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles/header.module.css";
import gsap from "gsap";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // Parallax: banner moves up as you scroll, max out at -100% of its height
      if (bannerRef.current) {
        const maxY = bannerRef.current.offsetHeight;
        const y = Math.min(scrollY, maxY);
        gsap.to(bannerRef.current, {
          y: -y,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { clearProps: "all" });
          }
        },
      });
    }
  }, [menuOpen]);

  return (
    <>
      <div className={styles.banner} ref={bannerRef}>
        <span>
          🌊 Summer Sale! Get 20% off on all oceanflo products. Use code:
          OCEAN20
        </span>
      </div>
      <header className={styles.header}>
        <button
          className={styles.hamburger + (menuOpen ? " " + styles.menuOpen : "")}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <span className={styles.cross} aria-hidden="true">
              &#10005;
            </span>
          ) : (
            <>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </>
          )}
        </button>
        <div className={styles.logo}>
          <a href="/">oceanflo</a>
        </div>
        <nav className={styles.nav}>
          <a href="#home" className={styles.link}>
            home
          </a>
          <a href="#knowus" className={styles.link}>
            about
          </a>
          <a href="#contactus" className={styles.link}>
            contact
          </a>
        </nav>
        <div
          className={styles.overlay}
          style={{ display: menuOpen ? "block" : "none" }}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
        />
        <div
          className={styles.mobileMenu}
          id="mobile-menu"
          ref={menuRef}
          style={{ pointerEvents: menuOpen ? "auto" : "none" }}
          aria-hidden={!menuOpen}
        >
          <a
            href="#home"
            className={styles.mobileLink}
            ref={(el) => {
              linksRef.current[0] = el;
            }}
            onClick={() => setMenuOpen(false)}
          >
            home
          </a>
          <a
            href="#knowus"
            className={styles.mobileLink}
            ref={(el) => {
              linksRef.current[1] = el;
            }}
            onClick={() => setMenuOpen(false)}
          >
            about
          </a>
          <a
            href="#contactus"
            className={styles.mobileLink}
            ref={(el) => {
              linksRef.current[2] = el;
            }}
            onClick={() => setMenuOpen(false)}
          >
            contact
          </a>
        </div>
      </header>
    </>
  );
}
