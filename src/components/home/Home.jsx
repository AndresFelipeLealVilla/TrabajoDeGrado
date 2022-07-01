import { useAuth } from "../../context/authContext"

export function Home() {

  const {user} = useAuth()
  
  return (
    <div>Home</div>
  )
}