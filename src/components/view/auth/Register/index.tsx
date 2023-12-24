import React, { FormEvent, useState } from "react"
import styles from "./Register.module.scss"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { push } = useRouter()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    try {
      event.preventDefault()
      setError("")
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)

      const result = await axios({
        method: "post",
        url: "/api/users/register",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (result.status === 200) {
        form.reset()
        setIsLoading(false)
        // push("login")
      } else {
        setIsLoading(false)
        setError("Email is already registered")
      }
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      setError("Email is already registered")
    }
  }

  console.log("error", error)

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.register__form__item__input}
            />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sig In <Link href="/auth/login">Here</Link>
      </p>
    </div>
  )
}

export default RegisterView
