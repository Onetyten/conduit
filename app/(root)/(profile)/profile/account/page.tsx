"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { profileInterface } from '@/lib/types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useRouter } from 'next/navigation'
import { clearUser } from '@/state/userSlice'
import { Pencil, KeyRound, LogOut, Trash2, Briefcase, ChevronRight } from 'lucide-react'
import Card from '@/components/Profile/Card'
import InfoRow from '@/components/Profile/account/InfoRow'
import BecomeProviderModal from '@/components/Profile/account/BecomeProviderModal'
import DeleteAccountModal from '@/components/Profile/account/DeleteAccountModal'
import ChangePasswordModal from '@/components/Profile/account/ChangePasswordModal'
import EditProfileModal from '@/components/Profile/account/EditProfileModal'


    // async function UpdateAccount(){
    //     setUploadingProfile(true)
    //     const userData = new FormData()
    //     if (!profile){
    //         return toast.error('This action not authorized, user not logged in ')
    //     }
    //     userData.append('_id',profile._id) 
    //     userData.append('isTalent',"true")
    //     userData.append('bio',newUser.bio)
    //     userData.append('phoneNumber', JSON.stringify(newUser.phoneNumber))
    //     userData.append('socialLinks',JSON.stringify(newUser.socialLinks))
    //     userData.append('skills',JSON.stringify(newUser.skills))
    //     try {
    //         const response = await axios.patch(`/api/profile/updateProfile`,userData)
    //         if (response.status != 200) return
    //         const updatedUser = response.data
    //         const payload:userState = {user:updatedUser.user,token:updatedUser.token}
    //         dispatch(setUser(payload))
    //         setSlideIndex(slideIndex+1)
    //         setUploadingProfile(false)
    //         toast.success("Account Updated successfully")
    //     }
    //     catch {
    //         toast("A error occured while updating your profile")
    //     }
    //     finally{
    //         setUploadingProfile(false)
    //     }
        
    // } 


export default function Page() {
  const userData = useSelector((state: RootState) => state.user.user) as profileInterface | null
  const dispatch = useDispatch()
  const router = useRouter()

  const [modal, setModal] = useState<null | 'edit' | 'provider' | 'password' | 'delete'>(null)

  if (!userData) return null

  const fullName = `${userData.lastName ?? 'John'} ${userData.firstName ?? 'Doe'}`
  const initials = `${userData.lastName?.slice(0, 1) ?? ''}${userData.firstName?.slice(0, 1) ?? ''}`

  return (
    <div className="w-full min-h-screen mt-6 sm:mt-0 pb-16 px-6 sm:px-[10%] flex flex-col gap-6 relative">
      <div className="mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-20 sm:size-24 aspect-square object-cover">
            <AvatarImage src={userData.profilePicture} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-2xl sm:text-3xl font-semibold break-all hyphens-auto">{fullName}</p>

            {userData.isTalent && (
              <span className="mt-1 inline-flex items-center gap-1 px-5 py-1.5 capitalize rounded-full bg-softblue text-conduit text-xs font-semibold border border-conduit/20 w-fit">
                <Briefcase size={15} /> Service Provider
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setModal('edit')}
          className="h-11 px-6 bg-conduit text-white font-medium rounded-xl hover:bg-black transition-colors flex items-center gap-2 text-sm self-start sm:self-auto"
        >
          <Pencil size={15} /> Edit Profile
        </button>
      </div>

      <Card title='Profile Info' >

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <InfoRow label="First Name" value={userData.firstName} />
          <InfoRow label="Last Name" value={userData.lastName} />
          <InfoRow label="Email" value={userData.email} />
          <InfoRow label="Country" value={userData.location?.country} />
          <InfoRow label="State" value={userData.location?.state} />
          <InfoRow label="District" value={userData.location?.district} />
          {userData.bio && <div className="col-span-2 sm:col-span-3"><InfoRow label="Bio" value={userData.bio} /></div>}
          {userData.skills?.length > 0 && (
            <div className="col-span-2 sm:col-span-3 flex flex-col gap-1.5">
              <p className="text-xs font-medium text-muted/70 uppercase tracking-wide">Skills</p>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-conduit/10 text-conduit text-xs font-medium border border-conduit/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {!userData.isTalent && (
        <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-semibold flex items-center gap-2"><Briefcase size={16} className="text-conduit" /> Become a Service Provider</p>
            <p className="text-sm text-muted">Offer your skills and start earning on Conduit.</p>
          </div>
          <button
            onClick={() => setModal('provider')}
            className="h-11 px-6 bg-conduit text-white font-medium rounded-xl hover:bg-black transition-colors text-sm text-nowrap flex items-center gap-2"
          >
            Get Started <ChevronRight size={15} />
          </button>
        </Card>
      )}

      <Card title='Security'>
        <button
          onClick={() => setModal('password')}
          className="w-full sm:w-auto h-11 px-6 rounded-xl border border-conduit/30 text-conduit font-medium hover:bg-conduit/5 transition-colors text-sm flex items-center gap-2"
        >
          <KeyRound size={15} /> Change Password
        </button>
      </Card>

      <Card title='Caution' className="border-red-200/60">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => { dispatch(clearUser()); router.replace('/') }}
            className="h-11 px-6 rounded-xl border border-muted/30 text-muted font-medium hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors text-sm flex items-center gap-2"
          >
            <LogOut size={15} /> Sign Out
          </button>
          <button
            onClick={() => setModal('delete')}
            className="h-11 px-6 rounded-xl bg-red-50 border border-red-200 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <Trash2 size={15} /> Delete Account
          </button>
        </div>
      </Card>

      {modal === 'edit' && <EditProfileModal user={userData} onClose={() => setModal(null)} />}
      {modal === 'provider' && <BecomeProviderModal onClose={() => setModal(null)} />}
      {modal === 'password' && <ChangePasswordModal onClose={() => setModal(null)} />}
      {modal === 'delete' && <DeleteAccountModal onClose={() => setModal(null)} />}
    </div>
  )
}