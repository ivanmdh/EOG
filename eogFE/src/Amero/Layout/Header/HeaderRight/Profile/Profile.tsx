import SVG from "@CommonComponent/SVG"
import { signOut, useSession } from "next-auth/react"
import { UserListData } from "@Data/Layout/SidebarData"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Profile = () => {
  const [show, setShow] = useState(false)
  const { data: session }: any = useSession()

  const router = useRouter()

  const handleLogout = () => {
    signOut()
        .finally(() => {
          localStorage.removeItem('accessToken')
          router.push("/")
        })
  }

  useEffect(() => {
    localStorage.setItem('accessToken', session?.user?.Authorization?.accessToken)
  }, [session])

  return (
    <li className='profile-nav custom-dropdown'>
      <div className='user-wrap'>
        <div className='user-content' onClick={() => setShow(!show)}>
          <h6>{session?.user?.email}</h6>
          <p className='mb-0'>
          {session?.user?.name || 'Admin'} 
            <i className='fa-solid fa-chevron-down' />
          </p>
        </div>
        <div className={`custom-menu overflow-hidden ${show ? "show" : ""}`}>
          <ul className='profile-body'>
            <li className='d-flex' onClick={handleLogout}>
              <SVG className='svg-color' iconId='Login' />
              <Link className='ms-2' href={ '#javascript' }>
                {'Cerrar Sesión'}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Profile;
