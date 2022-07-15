import { useAuth } from "../../context/authContext"
//import { useNavigate } from "react-router-dom";

export function Home() {
  const {user, logout, loading} = useAuth()
  
  const handleLogout = async () => {
      await logout()
  };

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={(handleLogout)}>
        Logout
      </button>
      </div>
  )
}