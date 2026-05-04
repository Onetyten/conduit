'use client'
import { useState } from "react"
import { toast } from "react-toastify"
import Modal from "./Modal"
import SkillSlide from "@/components/signup/skillSlide"
import LocationSlide from "@/components/signup/locationSlide"
import LinkSlide from "@/components/signup/linkSlide"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import CreateUser from "@/components/signup/createUser"
import api from "@/lib/api"
import { isAxiosError } from "axios"
import { setUser } from "@/state/userSlice"

export default function BecomeProviderModal({ onClose }: { onClose: () => void }) {
  const profile = useSelector((state:RootState)=>state.user.user)
  const [uploadingProfile,setUploadingProfile] = useState(false)
  const [step, setStep] = useState(0)
  const dispatch = useDispatch()
  const [form,setForm] = useState({
      location:{
          district: profile?.location.district || "",
          state: profile?.location.state || "",
          country: profile?.location.country || "",
      },
      phoneNumber:{
          code:"+234",
          num:"",
      },
      socialLinks:{
          facebook: profile?.socialLinks?.facebook || "",
          instagram: profile?.socialLinks?.instagram || "",
          twitter_x: profile?.socialLinks?.twitter_x || "",
          linkedin: profile?.socialLinks?.linkedin || "",
          other: profile?.socialLinks?.other || "",
      },
      isTalent: false,
      bio: profile?.bio || "",
      skills:profile?.skills || [] as string[],
  })

  const steps = ['About', 'Location', 'Social Links']

  async function handleSubmit() {
    try {
      setUploadingProfile(true)
      console.log("become a seller",form)
      const response = await api.patch('/api/profile/edit',{...form, isTalent:true})
      dispatch(setUser(response.data.user))
      onClose()
      toast.success("You're now a service provider!")

    }
    catch (error) {
      if (isAxiosError(error)){
        toast.warn(`unable to update profile, ${error.response?.data.message}`)
      } 
      else{
        toast.warn("unable to update profile")
      }
      
    }
    finally{
      setUploadingProfile(false)
      
    }
  }


  return (
    <Modal loading={uploadingProfile} title="Become a Service Provider" onClose={onClose}>
      <div className="flex gap-2 mb-5">
        {steps.map((s, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${i == step ? 'bg-conduit' : 'bg-muted/20'}`} />
        ))}
      </div>
      
      <p className="text-xs text-muted mb-4 font-medium tracking-wide uppercase">{steps[step]}</p>

      {step === 0 && (
        <SkillSlide setSlideIndex={setStep} slideIndex={step} newUser={form} setNewUser={setForm}/>
      )}

      {step === 1 && (
        <LocationSlide setSlideIndex={setStep} slideIndex={step} newUser={form} setNewUser={setForm}/>
      )}

      {step === 2 && (
        <LinkSlide setSlideIndex={setStep} slideIndex={step} newUser={form} setNewUser={setForm}/>
      )}
      
      {step === 3 && (
        <CreateUser setSlideIndex ={setStep} slideIndex={step} newUser={form} submit={handleSubmit} />
      )}

    </Modal>
  )
}