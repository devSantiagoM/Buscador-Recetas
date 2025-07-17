"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChefHat, Heart, Home, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Animaciones para el menú hamburguesa
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const buttonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              RecetasFáciles
            </h1>
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <nav className="hidden md:flex items-center gap-4 ml-auto">
            <Button
              href="/"
              variant={pathname === "/" ? "default" : "outline"}
              className={
                pathname === "/"
                  ? "bg-gradient-to-r from-orange-400 to-pink-500"
                  : "border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              }
            >
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
            <Button
              href="/favorites"
              variant={pathname === "/favorites" ? "default" : "outline"}
              className={
                pathname === "/favorites"
                  ? "bg-gradient-to-r from-orange-400 to-pink-500"
                  : "border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              }
            >
              <Heart className="h-4 w-4 mr-2" />
              Mis Favoritas
            </Button>
          </nav>

          {/* Mobile Menu Button - Right aligned */}
          <motion.div
            variants={buttonVariants}
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-[60]"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden flex-shrink-0 ml-auto relative overflow-hidden group bg-white/90 backdrop-blur-sm border border-orange-200/50 hover:bg-white"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-500/10 rounded-lg"
                initial={{ scale: 0 }}
                animate={{ scale: isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 relative z-10 text-orange-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5 relative z-10 text-orange-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="menu-overlay active md:hidden"
                onClick={closeMenu}
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ zIndex: 45 }}
              />
              <motion.nav
                className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg overflow-hidden"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ zIndex: 50 }}
              >
                <div className="container mx-auto px-4 py-6 space-y-3">
                  <motion.div variants={menuItemVariants}>
                    <Button
                      href="/"
                      onClick={closeMenu}
                      variant={pathname === "/" ? "default" : "outline"}
                      className={`w-full justify-start group relative overflow-hidden ${pathname === "/"
                        ? "bg-gradient-to-r from-orange-400 to-pink-500"
                        : "border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-500/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <Home className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Inicio</span>
                    </Button>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Button
                      href="/favorites"
                      onClick={closeMenu}
                      variant={pathname === "/favorites" ? "default" : "outline"}
                      className={`w-full justify-start group relative overflow-hidden ${pathname === "/favorites"
                        ? "bg-gradient-to-r from-orange-400 to-pink-500"
                        : "border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        }`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-500/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <Heart className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Mis Favoritas</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
