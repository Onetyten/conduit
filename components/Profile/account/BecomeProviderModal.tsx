import { useState } from "react"
import { toast } from "react-toastify"
import Modal from "./Modal"
import SkillSlide from "@/components/signup/skillSlide"
import LocationSlide from "@/components/signup/locationSlide"
import LinkSlide from "@/components/signup/linkSlide"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import CreateUser from "@/components/signup/createUser"

export default function BecomeProviderModal({ onClose }: { onClose: () => void }) {
  const profile = useSelector((state:RootState)=>state.user.user)
  const [uploadingProfile,setUploadingProfile] = useState(false)
  const [step, setStep] = useState(0)
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
    toast.success("You're now a service provider!")
    try {
      console.log("become a seller",form)
      // onClose()
      
    }
    catch (error) {
      
    }
    finally{
      
    }
  }


  return (
    <Modal title="Become a Service Provider" onClose={onClose}>
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