'use client'
import { profileInterface } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";
import Field from "./Field";
import Modal from "./Modal";
import { Check, MapPin, User, Zap } from "lucide-react";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { countryCodes } from "@/data/countryCodes";
import { CiCirclePlus } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import api from "@/lib/api";
import { updateUser } from "@/state/userSlice";
import { isAxiosError } from "axios";

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const profile = useSelector((state: RootState) => state.user.user) as profileInterface | null
  const [loading,setLoading] = useState(false)
  
  const [form, setForm] = useState<Partial<profileInterface>>({})
  const [newSkill,setNewSkill] = useState('')
  const dispatch = useDispatch()
  

  async function handleSave() {
    if (loading) return
    if (Object.keys(form).length === 0){
      toast.info("No changes made")
      return
    }

    try {
        setLoading(true)
        const response = await api.patch('/api/profile/edit',form)
        dispatch(updateUser(response.data.user))
        onClose()
        toast.success('Profile updated!')   
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
      setLoading(false)
      
    }

  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function change(path:string,value:any){
    setForm((prev)=> {
      if (!path.includes('.')){
        return {...prev, [path]:value}
      }
      const [parent,child] = path.split('.');
      
      return{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...prev, [parent]:{...(prev[parent as keyof profileInterface] as any), [child]:value}
      }
    })
  }

  function AddSkill(){
    if (newSkill.trim().length<3)
    return toast.warn("Skills must be at least 3 characters long.")
    if (newSkill.trim().length>20)
    return toast.warn("Skills must be at most 20 characters long.")
    const currentSkills = form.skills ?? profile?.skills ?? [];
    if (currentSkills.length >= 5) return toast.warn("Skill limit exceeded.");
  
    if (currentSkills.includes(newSkill.trim())) return toast.warn("This skill has already been added.");

    setForm(prev => ({
      ...prev, 
      skills: [...currentSkills, newSkill.trim()] 
    }));
  
    setNewSkill('');
  }

  function RemoveSkill(index:number){
    const currentSkills = form.skills ?? profile?.skills ?? [];
    setForm(prev => ({ ...prev, skills: currentSkills.filter((_, i) => i !== index) }));
  }

  return (
    <Modal title="Edit Profile" loading={loading} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {profile?.firstName && <Field label="First Name" value={form.firstName??profile?.firstName??""} onChange={e => change("firstName",e)} />}
          {profile?.lastName && <Field label="Last Name" value={form.lastName??profile?.lastName??""} onChange={e => change("lastName",e)} />}
          {profile?.lastName && <Field style ="w-full col-span-2" label="Bio" value={form.bio??profile?.bio??""} onChange={e => change("bio",e)} />}
            
          {profile?.phoneNumber.num &&
            <div className='flex col-span-2 flex-col gap-1 w-full'>
              <div className='flex gap-3 w-full items-center rounded-sm overflow-hidden'>
              
                  <select value={form?.phoneNumber?.code??profile.phoneNumber.code??"+234"} onChange={(e) => change("phoneNumber.code",e)} className='h-11 rounded-xl px-4 border focus:border-conduit/60  border-conduit/30 bg-white/60 placeholder:text-gray-400 transition text-sm'>
                      {[...countryCodes].sort((a, b) => a.country === 'Nigeria' ? -1 : b.country === 'Nigeria' ? 1 : 0).map((country) => (
                              <option key={country.iso} value={`+${country.code}`}>
                                  {country.iso} +{country.code}
                              </option>
                          ))
                      }
                  </select>

              
                  <Field type='tel' value={form?.phoneNumber?.num??profile.phoneNumber.num??""}
                      onChange={(e) => change("phoneNumber.num",e.replace(/\D/g, ''))}
                      placeholder='Phone number'
                      style='m-0.5'
                  />
              </div>
            </div>
            }
        </div>

        <p className="text-sm font-semibold text-conduit flex items-center gap-4 mt-3">
          <span className="flex gap-1 items-center">
            <MapPin size={14} /> Location
          </span>
          
          <div className="flex-1 h-0.5 bg-softblue">

          </div>
        </p>

        <div className="flex flex-col gap-3"> 
          {
            profile?.location?.country && (
              <Field label="Country" value={form?.location?.country??profile.location.country??""} onChange={e => change("location.country",e)} />
          )}
          {
            profile?.location?.state && (
              <Field label="State" value={form?.location?.state??profile.location.state??""} onChange={e => change("location.state",e)} />
          )}
          
          {
            profile?.location?.district && (
              <Field label="District" value={form?.location?.district??profile.location.district??""} onChange={e => change("location.district",e)}  />
            )
          }
        </div>

        <p className="text-sm font-semibold text-conduit flex items-center gap-4 mt-3">
          <span className="flex gap-1 items-center">
            <User size={14} /> Socials
          </span>
          
          <div className="flex-1 h-0.5 bg-softblue">

          </div>
        </p>

        <div className="flex flex-col gap-3"> 

          <Field label="Facebook" value={form?.socialLinks?.facebook??profile?.socialLinks?.facebook??""} onChange={e => change("socialLinks.facebook",e)} />

          <Field label="Instagram" value={form?.socialLinks?.instagram??profile?.socialLinks?.instagram??""} onChange={e => change("socialLinks.instagram",e)} />
    
          <Field label="Twitter" value={form?.socialLinks?.twitter_x??profile?.socialLinks?.twitter_x??""} onChange={e => change("socialLinks.twitter_x",e)} />
        
          <Field label="Linkedin" value={form?.socialLinks?.linkedin??profile?.socialLinks?.linkedin??""} onChange={e => change("socialLinks.linkedin",e)} />
        
          <Field label="Other" value={form?.socialLinks?.other??profile?.socialLinks?.other??""} onChange={e => change("socialLinks.other",e)} />

        </div>

        {profile && profile.skills?.length >0 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-conduit flex items-center gap-4 mt-3">
              <span className="flex gap-1 items-center">
                <Zap size={14} /> Skills
              </span>
              
              <div className="flex-1 h-0.5 bg-softblue">

              </div>
            </p>

            <div  className='flex flex-col mb-10 relative gap-2 w-full'>
                <form
                    onSubmit={(e)=>{
                        e.preventDefault()
                        AddSkill()
                    }
                }
                className='w-full h-12 relative '>
                  <input onChange={(e)=>{setNewSkill(e.target.value)}} value={newSkill} type='text' className='h-full placeholder:text-gray-500 rounded-sm p-3 lg:px-5 w-full border border-conduit/40' />  
                  <button type='submit'>
                    <CiCirclePlus size={30} className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2' />
                  </button>
                  
                </form>
                  
                  <p className='absolute -bottom-5 text-sm right-0'>
                    {(form.skills ?? profile?.skills ?? []).length}/5 services
                  </p>

                  <div className='w-full flex flex-wrap gap-2  '>
                    { (form.skills ?? profile?.skills ?? []).map((item,index)=>{
                        return(
                        <div key={index} className='p-1 px-3 text-sm flex items-center gap-1 rounded-full bg-softblue'>
                            <p>
                                {item}
                            </p>
                            <IoCloseOutline size={17} onClick={()=>{RemoveSkill(index)}} className='cursor-pointer' />
                        </div>
                        )
                    })}

                  </div>
            </div>

          </div>
        )}

        
        <button
          onClick={handleSave}
          className="mt-2 h-11 w-full bg-conduit text-white rounded-xl font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
        >
          <Check size={16} /> Save Changes
        </button>
      </div>
    </Modal>
  )
}

    // skills:profile?.skills || [] as string[],
    
